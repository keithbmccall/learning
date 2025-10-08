import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import './virtualized-table.css';

type TableData = {
  id: number;
  name: string;
  value: number;
  status: string;
};

const tableData: TableData[] = ((rows: number = 1000) => {
  const statuses = ['Active', 'Inactive', 'Pending', 'Completed'];
  const data: TableData[] = [];

  for (let i = 1; i <= rows; i++) {
    data.push({
      id: i,
      name: `Item ${i}`,
      value: Math.floor(Math.random() * 10000),
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }

  return data;
})(20000);

// Create column helper
const columnHelper = createColumnHelper<TableData>();

// Define columns
const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('value', {
    header: 'Value',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => info.getValue(),
  }),
];

export const VirtualizedTable = () => {
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows } = table.getRowModel();

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 70, // Each row is 70px
    overscan: 10, // Render 10 extra items for smooth scrolling
  });

  return (
    <div className="virtualized-table-container">
      <h2>Virtualized Table (20,000 rows)</h2>
      <div ref={parentRef} className="virtualized-table-scroll-container">
        <table className="virtualized-table">
          <thead className="virtualized-table-header">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="virtualized-table-header-cell">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            className="virtualized-table-body"
            style={{
              height: `${virtualizer.getTotalSize()}px`,
            }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <tr
                  key={row.id}
                  className="virtualized-table-row"
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
                    <td key={cell.id} className="virtualized-table-cell">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
