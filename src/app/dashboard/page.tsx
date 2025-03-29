"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import StockSearch from '@/components/stock-search';
import StockHistory from '@/components/stock-history';
import StockInfo from '@/components/stock-info';
import Navbar from '@/components/navbar';


const Dashboard = () => {

    const router = useRouter();
    const { user, isLoading } = useUser();

    useEffect(() => {

        if (!isLoading && !user)
            router.push('/');

    }, [isLoading, router, user]);


    return (
        <div className='flex flex-col m-8'>
            <Navbar />
            <div className='flex flex-row'>
                <StockSearch />
                <StockInfo />
            </div>
            <StockHistory />
        </div>
    )
};

export default Dashboard;