import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchStock } from "@/store/stockslice";
import { AppDispatch } from "@/store/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const StockSearch = () => {

    const dispatch: AppDispatch = useDispatch();


    const [searchSymbol, setSearchSymbol] = useState('');


    const handleSearch = () => {
        dispatch(fetchStock(searchSymbol));
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Stock Search</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-2">
                    <Input
                        type="text"
                        placeholder="Enter stock symbol"
                        value={searchSymbol}
                        onChange={(e) => setSearchSymbol(e.target.value)}
                    />
                    <Button onClick={handleSearch}>Search</Button>
                </div>
            </CardContent>
        </Card>
    )
};

export default StockSearch;