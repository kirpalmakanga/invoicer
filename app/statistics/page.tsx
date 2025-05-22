'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
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
import { useEffect, useMemo } from 'react';
import { getInvoicesChartData } from '@/lib/invoices';

const chartData = [
    { month: 'January', revenue: 1860 },
    { month: 'February', revenue: 3050 },
    { month: 'March', revenue: 2370 },
    { month: 'April', revenue: 730 },
    { month: 'May', revenue: 2090 },
    { month: 'June', revenue: 2140 },
    { month: 'July', revenue: 2140 },
    { month: 'August', revenue: 2140 },
    { month: 'September', revenue: 840 },
    { month: 'October', revenue: 1140 },
    { month: 'November', revenue: 3140 },
    { month: 'December', revenue: 2540 },
];

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: 'hsl(var(--chart-1))',
    },
} satisfies ChartConfig;

export default function Statistics() {
    const invoices = useInvoicesStore(({ invoices }) => invoices);
    const fetchInvoices = useInvoicesStore(
        ({ fetchInvoices }) => fetchInvoices
    );

    const chartDataByYear = useMemo(
        () => getInvoicesChartData(invoices),
        [invoices]
    );

    const years = useMemo(
        () => chartDataByYear.keys().toArray(),
        [chartDataByYear]
    );

    useEffect(() => {
        fetchInvoices();
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Area Chart - Linear</CardTitle>
                <CardDescription>
                    Showing total visitors for the last 6 months
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    indicator="dot"
                                    hideLabel
                                />
                            }
                        />
                        <Area
                            dataKey="revenue"
                            type="linear"
                            fill="var(--color-desktop)"
                            fillOpacity={0.4}
                            stroke="var(--color-desktop)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this month{' '}
                            <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            January - June 2024
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
