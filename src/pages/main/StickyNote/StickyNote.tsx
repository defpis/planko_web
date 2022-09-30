import { FC, useRef, useState } from 'react';
import { useInfiniteLoader, useMasonry, usePositioner, useResizeObserver } from 'masonic';
import { useSize, useScroller } from '@/common/hooks';
import './StickyNote.scss';
import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { PlusOutlined } from '@ant-design/icons';

const makeItems = (start = 0, end = 32) => {
  const fakeItems = [];
  for (let i = start; i < end; i++) fakeItems.push({ id: i });
  return fakeItems;
};

const makeItemsPromise = (start: number, end: number) => Promise.resolve(makeItems(start, end));

const Item: FC<{ data: { id: number } }> = ({ data: { id } }) => {
  if (id === 0) {
    return (
      <Card hoverable className="card-add">
        <PlusOutlined />
      </Card>
    );
  }
  return (
    <Card hoverable cover={<img src={`https://naver.github.io/egjs-infinitegrid/assets/image/${(id % 33) + 1}.jpg`} />}>
      <Meta title={id} />
    </Card>
  );
};

const StickyNote: FC = () => {
  const [items, setItems] = useState(makeItems);

  const loadMore = useInfiniteLoader(
    async (startIndex, stopIndex) => {
      if (startIndex > 100) {
        return;
      }
      const nextItems = await makeItemsPromise(startIndex, stopIndex);
      setItems((current) => [...current, ...nextItems]);
    },
    {
      isItemLoaded: (index, items) => !!items[index],
      minimumBatchSize: 32,
      threshold: 3,
    },
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useSize(containerRef);
  const { scrollTop, isScrolling } = useScroller(containerRef);
  const positioner = usePositioner({ width, columnWidth: 200, columnGutter: 16 });
  const resizeObserver = useResizeObserver(positioner);

  return (
    <div className="sticky-note">
      <div ref={containerRef} className="h-full p-6 overflow-x-hidden overflow-y-auto">
        {useMasonry({
          onRender: loadMore,
          positioner,
          resizeObserver,
          items,
          height,
          scrollTop,
          isScrolling,
          overscanBy: 2,
          render: Item,
        })}
      </div>
    </div>
  );
};

export default StickyNote;
