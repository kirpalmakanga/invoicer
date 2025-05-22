'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { useInvoicesStore } from '@/store/invoices';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getInvoicesChartData } from '@/lib/invoices';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from '@/components/ui/select';
import { getCurrentYear } from '@/lib/dates';

const chartConfig = {
    desktop: {
        label: 'Revenue',
        color: 'hsl(var(--chart-1))',
    },
} satisfies ChartConfig;

export default function Statistics() {
    const [selectedYear, setSelectedYear] = useState<number>(getCurrentYear());
    const invoices = useInvoicesStore(({ invoices }) => invoices);
    const fetchInvoices = useInvoicesStore(
        ({ fetchInvoices }) => fetchInvoices
    );

    const chartDataByYear = useMemo(
        () => getInvoicesChartData(invoices),
        [invoices]
    );

    const currentYearChartData = useMemo(() => {
        const chartData = chartDataByYear.get(selectedYear);

        if (chartData) {
            return chartData
                .entries()
                .toArray()
                .map(([month, revenue]) => ({
                    month,
                    revenue,
                }));
        }

        return [];
    }, [chartDataByYear]);

    const years = useMemo(
        () => chartDataByYear.keys().toArray(),
        [chartDataByYear]
    );

    const handleSelectYear = useCallback(
        (year: string) => setSelectedYear(parseInt(year)),
        []
    );

    useEffect(() => {
        fetchInvoices();
    }, []);

    return (
        <>
            <div className="flex justify-end mb-4">
                <Select
                    value={String(selectedYear)}
                    onValueChange={handleSelectYear}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a year" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {years.map((year) => (
                                <SelectItem key={year} value={String(year)}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Revenues for year {selectedYear}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <BarChart
                            accessibilityLayer
                            data={currentYearChartData}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar
                                dataKey="revenue"
                                fill="var(--chart-1)"
                                radius={8}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="leading-none text-muted-foreground">
                        {/* Showing total visitors for the last 6 months */}
                    </div>
                </CardFooter>
            </Card>
        </>
    );
}
