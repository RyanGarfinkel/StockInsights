"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import StockSearch from '@/components/stock-search';
import StockHistory from '@/components/stock-history';
import StockInfo from '@/components/stock-info';
import Navbar from '@/components/navbar';
import News from '@/components/news';


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
            <div className='flex flex-row space-x-8'>
                <StockSearch />
                <StockInfo />
            </div>
            <div className='flex flex-row space-x-8 w-full'>
                <StockHistory />
                <News/>
            </div>
        </div>
    )
};

export default Dashboard;