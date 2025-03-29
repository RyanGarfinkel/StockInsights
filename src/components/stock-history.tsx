import { LineChart, CartesianGrid, XAxis, Line, LabelList } from "recharts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useEffect, useState } from "react"

const StockHistory = () => {

    const stock = useSelector((state: RootState) => state.stock);
    const [chartData, setChartData] = useState(stock.history);

    useEffect(() => {
        setChartData(stock.history);
    }, [stock.history]);

    const chartConfig = {
        price: {
            label: "Price",
            color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig;

    return (
        <Card>
            <CardHeader>
                <CardTitle>History</CardTitle>
                <CardDescription>View the price history.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return `${(date.getMonth() + 1)
                                    .toString()
                                    .padStart(2, '0')}/${date
                                    .getDate()
                                    .toString()
                                    .padStart(2, '0')}`;
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator='line' />}
                        />
                        <Line
                            dataKey='price'
                            type='natural'
                            strokeWidth={2}
                            activeDot={{
                                r: 6,
                            }}
                        >
                            <LabelList
                                position='top'
                                offset={12}
                                className='fill-foreground'
                                fontSize={12}
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
};

export default StockHistory;