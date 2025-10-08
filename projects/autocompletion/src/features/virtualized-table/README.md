# Virtualized Table

A high-performance virtualized table component built with TanStack React Table and React Virtual.

## Features

- **Virtualization**: Efficiently renders 20,000+ rows by only displaying visible items
- **Smooth Scrolling**: Optimized scrolling with overscan for seamless user experience
- **Sticky Header**: Header remains visible while scrolling through data
- **Customizable Row Height**: Each row is 70px tall for consistent spacing
- **TypeScript Support**: Fully typed with proper interfaces
- **Responsive Design**: Clean styling with hover effects and alternating row colors

## Technology Stack

- **TanStack React Table**: For table state management and column definitions
- **TanStack React Virtual**: For virtualization and performance optimization
- **React**: Component framework
- **TypeScript**: Type safety and developer experience

## Usage

```tsx
import { VirtualizedTable } from './features/virtualized-table/virtualized-table';

function App() {
  return (
    <div>
      <VirtualizedTable />
    </div>
  );
}
```

## Generic Implementation

Here's a generic example of how TanStack React Table and React Virtual work together:

```tsx
import { useRef } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

// 1. Define your data type
type DataType = {
  id: number;
  name: string;
  value: number;
};

// 2. Create your data
const data: DataType[] = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  value: Math.floor(Math.random() * 1000),
}));

// 3. Define columns using column helper
const columnHelper = createColumnHelper<DataType>();
const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('value', {
    header: 'Value',
    cell: (info) => info.getValue(),
  }),
];

function GenericVirtualizedTable() {
  // 4. Set up React Table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows } = table.getRowModel();
  const parentRef = useRef<HTMLDivElement>(null);

  // 5. Set up React Virtual
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // Row height
    overscan: 5, // Extra items to render
  });

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <table style={{ width: '100%' }}>
        {/* 6. Render sticky header */}
        <thead style={{ position: 'sticky', top: 0, backgroundColor: 'white' }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} style={{ padding: '8px', border: '1px solid #ccc' }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* 7. Render virtualized body */}
        <tbody
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index];
            return (
              <tr
                key={row.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={{ padding: '8px', border: '1px solid #ccc' }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
```

### Key Concepts

1. **React Table** manages the table state, columns, and data
2. **React Virtual** handles the virtualization by only rendering visible rows
3. **Absolute positioning** places virtual rows at their correct scroll positions
4. **Sticky header** remains visible while scrolling through data
5. **Overscan** renders extra items for smooth scrolling

## How React Virtual Works Under the Hood

React Virtual is a powerful library that implements **windowing** - a technique that only renders visible items in a scrollable container, dramatically improving performance for large datasets.

### Core Algorithm

```tsx
const virtualizer = useVirtualizer({
  count: 20000, // Total number of items
  getScrollElement: () => parentRef.current,
  estimateSize: () => 70, // Estimated height per item
  overscan: 10, // Extra items to render
});
```

### 1. **Row Height Calculation**

React Virtual uses the `estimateSize` function to calculate row heights:

```tsx
// Static height (what we use)
estimateSize: () => 70; // Every row is exactly 70px

// Dynamic height (more complex)
estimateSize: (index) => {
  // Could measure actual DOM elements
  // Could use different heights based on content
  return data[index].isExpanded ? 140 : 70;
};
```

**How it works:**

- **Initial render**: Uses `estimateSize()` for all rows
- **Dynamic measurement**: Can measure actual DOM elements and update
- **Total height**: `count × estimateSize()` = 20,000 × 70px = 1,400,000px

### 2. **Table Height Calculation**

```tsx
// The tbody gets the total virtual height
<tbody style={{ height: `${virtualizer.getTotalSize()}px` }}>
  {/* Only ~15-20 rows actually rendered */}
</tbody>
```

**Why this works:**

- Browser creates scrollable space based on container height
- 1,400,000px height allows scrolling through all 20,000 rows
- Only visible rows are rendered in the DOM

### 3. **Visible Range Calculation**

React Virtual calculates which items should be visible:

```tsx
// Simplified calculation
const scrollTop = scrollElement.scrollTop; // Current scroll position
const containerHeight = scrollElement.clientHeight; // Visible area height

const startIndex = Math.floor(scrollTop / itemHeight);
const endIndex = Math.ceil((scrollTop + containerHeight) / itemHeight);

// With overscan
const overscanStart = Math.max(0, startIndex - overscan);
const overscanEnd = Math.min(count - 1, endIndex + overscan);
```

**Example with 70px rows, 600px container:**

- Scroll at 0px: Render items 0-8 (8.5 visible + overscan)
- Scroll at 700px: Render items 10-18 (items 10-18 visible)
- Scroll at 1400px: Render items 20-28 (items 20-28 visible)

### 4. **DOM Management**

React Virtual efficiently manages the DOM by:

```tsx
// Only these items exist in the DOM
{
  virtualizer.getVirtualItems().map((virtualRow) => {
    const row = rows[virtualRow.index];
    return (
      <tr
        style={{
          position: 'absolute',
          transform: `translateY(${virtualRow.start}px)`, // Key positioning
        }}
      >
        {/* Row content */}
      </tr>
    );
  });
}
```

**DOM Operations:**

- **Add**: New rows enter the visible range
- **Remove**: Rows leave the visible range (garbage collected)
- **Update**: Existing rows get new `translateY` values
- **Reuse**: Same DOM elements can represent different data items

### 5. **Positioning Strategy**

```tsx
// Each virtual row gets calculated position
const virtualRow = {
  index: 150, // Data index
  start: 10500, // 150 × 70px = 10,500px from top
  size: 70, // Row height
  end: 10570, // start + size
};
```

**Absolute Positioning:**

- `position: absolute` removes rows from normal document flow
- `transform: translateY()` positions rows at virtual locations
- Browser handles smooth scrolling between positions

### 6. **Performance Optimizations**

**Memory Management:**

```tsx
// Only ~15-20 DOM elements exist at any time
// Instead of 20,000 DOM elements
const memorySavings = ((20000 - 20) / 20000) * 100; // 99.9% reduction
```

**Scroll Performance:**

- **Overscan**: Renders extra items to prevent blank spaces during fast scrolling
- **Debounced updates**: Batches DOM updates for smooth performance
- **Transform optimization**: Uses CSS transforms (GPU accelerated)

### 7. **Scroll Event Handling**

```tsx
// React Virtual listens to scroll events
const handleScroll = () => {
  const scrollTop = scrollElement.scrollTop;

  // Calculate new visible range
  const newStartIndex = Math.floor(scrollTop / itemHeight);
  const newEndIndex = Math.ceil((scrollTop + containerHeight) / itemHeight);

  // Update virtual items if range changed
  if (newStartIndex !== currentStartIndex || newEndIndex !== currentEndIndex) {
    updateVirtualItems(newStartIndex, newEndIndex);
  }
};
```

### 8. **Real-World Example**

With 20,000 rows at 70px each:

```
Total Virtual Height: 1,400,000px
Container Height: 600px
Visible Rows: ~8.5 rows
Rendered Rows: ~18 rows (with overscan)
DOM Elements: 18 <tr> elements
Memory Usage: 99.9% reduction vs rendering all rows
```

**As you scroll:**

- Scroll to 700px: Renders rows 10-28, removes rows 0-9
- Scroll to 1400px: Renders rows 20-38, removes rows 10-19
- Only 18 DOM elements exist at any time, regardless of scroll position

This is why virtualization can handle millions of rows with the same performance as a few dozen rows!

## Performance

- Only renders ~15-20 visible rows at a time instead of all 20,000
- Uses absolute positioning for efficient DOM manipulation
- Implements overscan for smooth scrolling experience
- Memory efficient for large datasets

## Data Structure

The table displays data with the following structure:

```typescript
type TableData = {
  id: number;
  name: string;
  value: number;
  status: string;
};
```

## Styling

The component includes:

- Custom CSS classes for consistent styling
- Hover effects for better user interaction
- Alternating row colors for improved readability
- Custom scrollbar styling
- Responsive design considerations
