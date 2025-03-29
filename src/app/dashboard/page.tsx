"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';


const Dashboard = () => {

    const router = useRouter();
    const { user, isLoading } = useUser();

    useEffect(() => {

        if (!isLoading && !user)
            router.push('/');

    }, [isLoading, router, user]);

    
    
    return (
        <div className="p-4">
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Stock Name</CardTitle>
                    <CardDescription>
                        Enter the stock symbol to get insights.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            const stockSymbol = (e.target as HTMLFormElement).stock.value;
                            console.log('Stock Symbol:', stockSymbol);
                            // Add your logic to handle the stock symbol here
                        }}
                    >
                        <div className="space-y-4">
                            <Input name="stock" placeholder="Enter stock symbol" />
                            <Button type="submit" className="w-full">
                                Submit
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
};

export default Dashboard;