import { useState } from 'react';
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

interface InvoiceItemInputProps {
    items: InvoiceItem[];
    onUpdate: (items: InvoiceItem[]) => void;
}

function getInitialRowState(): InvoiceItem {
    return { description: '', quantity: 0, pricePerUnit: 0, unit: 'hour' };
}

export function InvoiceItemInput({ items, onUpdate }: InvoiceItemInputProps) {
    const [currentItems, setCurrentItems] = useState<InvoiceItem[]>(
        items.length ? items : [getInitialRowState()]
    );

    function addRow() {
        setCurrentItems((items) => [...items, getInitialRowState()]);
    }

    function deleteRow(index: number) {
        setCurrentItems((items) => items.filter((_, i) => i !== index));
    }

    function updateRow(index: number, data: Partial<InvoiceItem>) {
        setCurrentItems((items) =>
            items.with(index, { ...items[index], ...data })
        );

        onUpdate(currentItems);
    }

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
                            <TableRow>
                                <TableCell>
                                    <Textarea
                                        value={description}
                                        onInput={({
                                            currentTarget: {
                                                value: description,
                                            },
                                        }) => updateRow(index, { description })}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        value={quantity}
                                        step={1}
                                        min={0}
                                        onInput={({
                                            currentTarget: { value },
                                        }) =>
                                            updateRow(index, {
                                                quantity: parseFloat(value),
                                            })
                                        }
                                    />
                                </TableCell>
                                <TableCell>
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
                                </TableCell>
                                <TableCell>
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
                                                <SelectLabel>
                                                    Fruits
                                                </SelectLabel>
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
                                </TableCell>
                                {currentItems.length > 1 && index > 0 ? (
                                    <TableCell>
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
