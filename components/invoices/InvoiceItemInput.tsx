import { useCallback, useEffect, useState } from 'react';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { isEqual } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import { InvoiceSchema } from '@/lib/validation';

interface InvoiceItemInputProps {
    items: InvoiceItem[];
    onUpdate: (items: InvoiceItem[]) => void;
}

function getInitialRowState(): InvoiceItem {
    return { description: '', quantity: 0, pricePerUnit: 0, unit: 'hour' };
}

export function InvoiceItemInput({ items, onUpdate }: InvoiceItemInputProps) {
    const {
        formState: { errors },
        setValue,
    } = useFormContext<InvoiceSchema>();

    const [currentItems, setCurrentItems] = useState<InvoiceItem[]>(
        items.length ? items : [getInitialRowState()]
    );

    const addRow = useCallback(() => {
        setCurrentItems((items) => [...items, getInitialRowState()]);
    }, []);

    const deleteRow = useCallback((index: number) => {
        setCurrentItems((items) => items.filter((_, i) => i !== index));
    }, []);

    const updateRow = useCallback(
        (index: number, data: Partial<InvoiceItem>) => {
            setCurrentItems((items) =>
                items.with(index, { ...items[index], ...data })
            );
        },
        []
    );

    useEffect(() => {
        if (!isEqual(items, currentItems)) {
            onUpdate(currentItems);
        }
    }, [items, currentItems, onUpdate]);

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold">Description</TableHead>
                        <TableHead className="font-bold">Quantity</TableHead>
                        <TableHead className="font-bold">Price/Unit</TableHead>
                        <TableHead className="font-bold">Unit</TableHead>

                        {currentItems.length > 1 ? (
                            <TableHead></TableHead>
                        ) : null}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {currentItems.map(
                        (
                            { description, quantity, pricePerUnit, unit },
                            index
                        ) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Textarea
                                        value={description}
                                        onInput={({
                                            currentTarget: {
                                                value: description,
                                            },
                                        }) => updateRow(index, { description })}
                                    />
                                    {errors.items?.[index]?.description && (
                                        <span className="text-xs text-red-500">
                                            This field is required
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="align-top w-[100px]">
                                    <Input
                                        type="number"
                                        value={quantity}
                                        step={1}
                                        min={0}
                                        onInput={({
                                            currentTarget: { value },
                                        }) =>
                                            updateRow(index, {
                                                quantity: parseInt(value),
                                            })
                                        }
                                    />
                                    {errors.items?.[index]?.quantity && (
                                        <span className="text-xs text-red-500">
                                            This field is required
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="align-top w-[100px]">
                                    <Input
                                        type="number"
                                        value={pricePerUnit}
                                        step={1}
                                        min={0}
                                        onInput={({
                                            currentTarget: { value },
                                        }) =>
                                            updateRow(index, {
                                                pricePerUnit: parseFloat(value),
                                            })
                                        }
                                    />
                                    {errors.items?.[index]?.pricePerUnit && (
                                        <span className="text-xs text-red-500">
                                            This field is required
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="align-top w-[100px]">
                                    <Select
                                        value={unit}
                                        onValueChange={(
                                            unit: InvoiceItemUnit
                                        ) => updateRow(index, { unit })}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a unit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="hour">
                                                    Hour
                                                </SelectItem>
                                                <SelectItem value="day">
                                                    Day
                                                </SelectItem>
                                                <SelectItem value="week">
                                                    Week
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                    {errors.items?.[index]?.unit && (
                                        <span className="text-xs text-red-500">
                                            This field is required
                                        </span>
                                    )}
                                </TableCell>
                                {currentItems.length > 1 ? (
                                    <TableCell className="align-top w-[50px]">
                                        <Button
                                            onClick={() => deleteRow(index)}
                                        >
                                            <Trash />
                                        </Button>
                                    </TableCell>
                                ) : null}
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>

            <div className="flex justify-end mt-4">
                <Button type="button" onClick={addRow}>
                    Add row
                </Button>
            </div>
        </div>
    );
}
