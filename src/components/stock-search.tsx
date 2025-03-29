import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchStock } from '@/store/stockslice';
import { AppDispatch } from '@/store/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const StockSearch = () => {

    const dispatch: AppDispatch = useDispatch();

    const [searchSymbol, setSearchSymbol] = useState('');
    const [searchError, setSearchError] = useState('');


    const handleChnage = (val: string) => {

        setSearchSymbol(val);
        
        if(!val)
            setSearchError('Please enter a stock symbol.');
    }

    const handleSearch = () => {

        if(!searchSymbol)
        {
            setSearchError('Please enter a stock symbol.');
            return;
        }

        dispatch(fetchStock(searchSymbol));
        setSearchError('');
        setSearchSymbol('');
    }

    return (
        <Card className='w-80'>
            <CardHeader>
                <CardTitle>Search Symbol</CardTitle>
                <CardDescription>
                    Enter stock symbol.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col space-y-2'>
                    <div className='flex items-center space-x-2'>
                        <Input
                            type='text'
                            placeholder='Ex. MSFT'
                            value={searchSymbol}
                            onChange={(e) => handleChnage(e.target.value)}
                            className='pr-10'
                        />
                        <Button onClick={handleSearch}>Find</Button>
                    </div>
                    <p className={`text-sm ${searchError ? 'text-red-500' : 'invisible'}`}>
                        {searchError ? searchError : <span className="invisible">Placeholder</span>}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
};

export default StockSearch;