import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

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
    <div style={{ margin: '20px 0', padding: '20px' }}>
      <h2 style={{ marginBottom: '16px', color: '#333', fontSize: '24px', fontWeight: 600 }}>
        Virtualized Table (20,000 rows)
      </h2>
      <div
        ref={parentRef}
        style={{
          height: '600px',
          overflow: 'auto',
          width: '800px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            position: 'relative',
          }}
        >
          <thead
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              backgroundColor: 'white',
            }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      height: '70px',
                      border: '1px solid #ccc',
                      padding: '8px',
                      backgroundColor: '#f5f5f5',
                      fontWeight: 'bold',
                      textAlign: 'left',
                      fontSize: '14px',
                      color: '#333',
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            style={{
              position: 'relative',
              height: `${virtualizer.getTotalSize()}px`,
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
                    <td
                      key={cell.id}
                      style={{
                        height: '70px',
                        border: '1px solid #ccc',
                        padding: '8px',
                        fontSize: '14px',
                        color: '#555',
                        backgroundColor: 'white',
                      }}
                    >
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
