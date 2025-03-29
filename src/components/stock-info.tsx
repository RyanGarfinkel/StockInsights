import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RootState } from "@/store/store";
import { toDollar, toPercent, toShortNumber } from "@/utils/number-formater";
import { useEffect, useState } from "react";

const StockInfo = () => {

    const stock = useSelector((state: RootState) => state.stock);

    const [changeColor, setChangeColor] = useState('text-gray-500');
    const [showPercent, setShowPercent] = useState(false);

    useEffect(() => {

        if (stock.dayChangeDollar > 0)
            setChangeColor('text-green-500');
        else if (stock.dayChangeDollar < 0)
            setChangeColor('text-red-500');
        else
            setChangeColor('text-gray-500');
    }, [stock.dayChangeDollar]);

    return (
        <Card className="w-96">
            <CardHeader>
                <CardTitle>
                    <div className='flex flex-row justify-between items-start'>
                        <div className="flex flex-col flex-start items-start">
                            <span>
                                {`${stock.name || 'Company Name'} (${stock.symbol || 'XXXX'})`}
                            </span>
                            <div className="text-sm text-gray-500">
                                { stock.sector || 'N/A' }
                            </div>
                        </div>
                        <div className="flex flex-col flex-start items-end">
                            <span className="text-xl font-bold">
                                { toDollar(stock.price) }
                            </span>
                            <div className="flex justify-between items-center">
                                <span 
                                    className={`text-sm font-medium cursor-pointer ${changeColor}`}
                                    onClick={() => setShowPercent(!showPercent)}
                                    >
                                    { showPercent ? toPercent(stock.dayChangePercent) : toDollar(stock.dayChangeDollar) }
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
                            <p>{toShortNumber(stock.marketCap)}</p>
                        </div>
                        <div className="flex justify-between text-sm">
                            <p className="text-gray-500 mr-2">52 Week Range:</p>
                            <p>{toDollar(stock.week52Low)} - {toDollar(stock.week52High)}</p>
                        </div>
                    </div>
                    <div className="flex flex-col flex-start items-end space-y-2">
                        <div className="flex justify-between text-sm">
                            <p className="text-gray-500 mr-2">Volume:</p>
                            <p>{toShortNumber(stock.volume)}</p>
                        </div>
                        <div className="flex justify-between text-sm">
                            <p className="text-gray-500 mr-2">Yield:</p>
                            <p>{toPercent(stock.dividendYield)}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default StockInfo;
