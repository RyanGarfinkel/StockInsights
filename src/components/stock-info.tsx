import { useSelector } from "react-redux"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { RootState } from "@/store/store";

const StockInfo = () => {

    const stock = useSelector((state: RootState) => state.stock);

    return (
        <Card>
            <CardHeader>
                <CardTitle> { stock.name }</CardTitle>
                <CardDescription>
                    { stock.symbol }
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Price: { stock.price }</p>
            </CardContent>
        </Card>
    );
};

export default StockInfo;