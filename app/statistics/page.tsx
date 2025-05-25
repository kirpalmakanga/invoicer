'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

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
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from '@/components/ui/select';
import { useInvoicesStore } from '@/store/invoices';
import { getRevenueStatistics } from '@/lib/invoices';

import { getCurrentYear, monthNames } from '@/lib/dates';
import { useShallow } from 'zustand/react/shallow';
import { sum } from '@/lib/utils';

const chartConfig = {
    desktop: {
        label: 'Revenue',
        color: 'hsl(var(--chart-1))',
    },
} satisfies ChartConfig;

export default function Statistics() {
    const [selectedYear, setSelectedYear] = useState<number>(getCurrentYear());
    const invoices = useInvoicesStore(
        useShallow(({ invoices }) =>
            invoices.filter(
                ({ status, datePaid }) => status === 'paid' && datePaid
            )
        )
    );
    const fetchInvoices = useInvoicesStore(
        ({ fetchInvoices }) => fetchInvoices
    );

    const revenueDataByYear = useMemo(
        () => getRevenueStatistics(invoices),
        [invoices]
    );

    const { currentYearChartData, currentYearTotalRevenue } = useMemo(() => {
        const currentYearRevenueData = revenueDataByYear.get(selectedYear);
        const result: {
            currentYearChartData: { month: string; revenue: number }[];
            currentYearTotalRevenue: number;
        } = {
            currentYearChartData: [],
            currentYearTotalRevenue: 0,
        };

        if (currentYearRevenueData) {
            result.currentYearChartData = currentYearRevenueData.map(
                (revenue, month) => ({
                    month: monthNames[month],
                    revenue,
                })
            );

            result.currentYearTotalRevenue = sum(...currentYearRevenueData);
        }

        return result;
    }, [selectedYear, revenueDataByYear]);

    const years = useMemo(
        () =>
            revenueDataByYear
                .keys()
                .toArray()
                .toSorted((a, b) => b - a),
        [revenueDataByYear]
    );

    const handleSelectYear = useCallback(
        (year: string) => setSelectedYear(parseInt(year)),
        []
    );

    useEffect(() => {
        fetchInvoices();
    }, []);

    return (
        <div className="md:w-2xl mx-auto">
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
                    <CardTitle>Revenue for year {selectedYear}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <BarChart
                            accessibilityLayer
                            data={currentYearChartData}
                            margin={{ top: 20 }}
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
                            >
                                <LabelList dataKey="revenue" position="top" />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="leading-none text-muted-foreground">
                        {/* Showing total visitors for the last 6 months */}
                    </div>
                </CardFooter>

                <CardFooter>
                    <div className="leading-none text-muted-foreground text-sm">
                        <strong>Total revenue:</strong>{' '}
                        {currentYearTotalRevenue}€
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
