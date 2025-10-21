import { Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { DataTableFacetedFilter } from '@/components/ui/data-table-faceted-filter';
import { CheckCircle2, XCircle } from 'lucide-react';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchField: string;
  fieldName: string;
  filterProperties?: [];
}

const statuses = [
  {
    value: 'Active',
    label: 'Active',
    icon: CheckCircle2,
  },
  {
    value: 'Inactive',
    label: 'Inactive',
    icon: XCircle,
  },
];
export function DataTableToolbar<TData>({
                                          table,
                                          searchField,
                                          fieldName,
                                          filterProperties,
                                        }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className='mb-3 mt-2 flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        {filterProperties?.map((_item: any) => (
          <div key={_item.id}>
            {table.getColumn(_item.column_name) && (
              <DataTableFacetedFilter
                column={table.getColumn(_item.column_name)}
                title={_item.title}
                options={_item.options}
              />
            )}
          </div>
        ))}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <XCircle className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <Input
        placeholder={`Filter ${fieldName} ...`}
        value={(table.getColumn(searchField)?.getFilterValue() as string) ?? ''}
        onChange={(event) =>
          table.getColumn(searchField)?.setFilterValue(event.target.value)
        }
        className='h-8 w-[150px] lg:w-[250px]'
      />
    </div>
  );
}