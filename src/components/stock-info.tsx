import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RootState } from "@/store/store";
import { toDollar, toPercent, toShortNumber } from "@/utils/number-formater";
import { useEffect, useState } from "react";

const StockInfo = () => {

    const overview = useSelector((state: RootState) => state.overview);
    const quote = useSelector((state: RootState) => state.quote);

    const [changeColor, setChangeColor] = useState('text-gray-500');
    const [showPercent, setShowPercent] = useState(false);

    useEffect(() => {

        if ((quote.quote?.changeDollar ?? 0) > 0)
            setChangeColor('text-green-500');
        else if ((quote.quote?.changeDollar ?? 0) < 0)
            setChangeColor('text-red-500');
        else
            setChangeColor('text-gray-500');
    }, [quote]);

    return (
        <Card className="w-96">
            <CardHeader>
                <CardTitle>
                    <div className='flex flex-row justify-between items-start'>
                        <div className="flex flex-col flex-start items-start">
                            <span>
                                {`${overview.overview?.name || 'Company Name'} (${overview.overview?.symbol || 'XXXX'})`}
                            </span>
                            <div className="text-sm text-gray-500">
                                { overview.overview?.sector || 'N/A' }
                            </div>
                        </div>
                        <div className="flex flex-col flex-start items-end">
                            <span className="text-xl font-bold">
                                { toDollar(quote.quote?.price ?? 0) }
                            </span>
                            <div className="flex justify-between items-center">
                                <span 
                                    className={`text-sm font-medium cursor-pointer ${changeColor}`}
                                    onClick={() => setShowPercent(!showPercent)}
                                    >
                                    { showPercent ? toPercent(quote.quote?.changePercent ?? 0) : toDollar(quote.quote?.changeDollar ?? 0) }
                                </span>
                            </div>
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row justify-between items-start">
                    <div className="flex flex-col flex-start items-start space-y-2">
                        <div className="flex justify-between text-sm">
                            <p className="text-gray-500 mr-2">Market Cap:</p>
                            <p>{toShortNumber(overview.overview?.marketCap ?? 0)}</p>
                        </div>
                        <div className="flex justify-between text-sm">
                            <p className="text-gray-500 mr-2">52 Week Range:</p>
                            <p>{toDollar(overview.overview?.yearLow ?? 0)} - {toDollar(overview.overview?.yearHigh ?? 0)}</p>
                        </div>
                    </div>
                    <div className="flex flex-col flex-start items-end space-y-2">
                        <div className="flex justify-between text-sm">
                            <p className="text-gray-500 mr-2">Volume:</p>
                            <p>{toShortNumber(quote.quote?.volume ?? 0)}</p>
                        </div>
                        <div className="flex justify-between text-sm">
                            <p className="text-gray-500 mr-2">Yield:</p>
                            <p>{toPercent(overview.overview?.dividendYield ?? 0)}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default StockInfo;
