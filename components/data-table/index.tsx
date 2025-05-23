import { FormEventHandler, useCallback, useState } from 'react';
import { Trash } from 'lucide-react';

import {
    ColumnDef,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { DataTablePagination } from './pagination';
import { DataTableViewOptions } from './view-options';
import Prompt from '@/components/Prompt';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onRemoveSelected?: (indexes: number[]) => void;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    onRemoveSelected,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const [globalFilter, setGlobalFilter] = useState('');

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );

    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: { sorting, globalFilter, columnVisibility, rowSelection },
        globalFilterFn: 'includesString',
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    const handleFilterUpdate = useCallback<FormEventHandler<HTMLInputElement>>(
        ({ currentTarget: { value } }) => {
            setGlobalFilter(value);
        },
        []
    );

    const handleFilterReset = useCallback(() => setGlobalFilter(''), []);

    const handleRemoveSelected = useCallback(() => {
        if (onRemoveSelected) {
            onRemoveSelected(Object.keys(rowSelection).map((k) => parseInt(k)));

            setRowSelection({});
        }
    }, [rowSelection, onRemoveSelected]);

    return (
        <div>
            <div className="flex items-center justify-between py-4">
                <div className="flex items-center space-x-2">
                    <Input
                        className="w-[200px] h-8 text-sm"
                        placeholder="Filter results"
                        value={globalFilter}
                        onInput={handleFilterUpdate}
                    />

                    {globalFilter ? (
                        <Button className="h-8" onClick={handleFilterReset}>
                            Reset
                        </Button>
                    ) : null}
                </div>

                <div className="flex items-center space-x-2">
                    {Object.keys(rowSelection).length ? (
                        <Prompt
                            title={`Delete selected items ?`}
                            description="This action cannot be undone"
                            confirmLabel="Delete"
                            onSubmit={handleRemoveSelected}
                        >
                            <Button className="h-8">
                                <Trash />
                                Remove selected
                            </Button>
                        </Prompt>
                    ) : null}

                    <DataTableViewOptions table={table} />
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{' '}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>

                <DataTablePagination table={table} />
            </div>
        </div>
    );
}
