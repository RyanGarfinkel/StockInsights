"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StockSearch from '@/components/stocksearch';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


const Dashboard = () => {

    const router = useRouter();
    const { user, isLoading } = useUser();

    useEffect(() => {

        if (!isLoading && !user)
            router.push('/');

    }, [isLoading, router, user]);

    const stock = useSelector((state: RootState) => state.stock);

    return (
        <div>
            <StockSearch />
            <Card>
                <CardHeader>
                    <CardTitle>Stock State</CardTitle>
                    <CardDescription>Current stock information</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <p>Stock Symbol: {stock.symbol}</p>
                        <p>Stock Name: {stock.name}</p>
                        <p>Price: ${stock.price}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
};

export default Dashboard;