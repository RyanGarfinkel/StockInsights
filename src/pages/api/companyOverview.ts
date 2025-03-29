import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import CompanyOverview from '@/models/companyOverview';

const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET')
        return res.status(405).json({ error: 'Method not allowed' });

    const { ticker } = req.query;

    if(!ticker)
        return res.status(400).json({ error: 'Ticker symbol is required and must be a string' });

    try {
        const response = await axios.get(`https://www.alphavantage.co/query`,
            {
                params: {
                    function: 'OVERVIEW',
                    symbol: ticker,
                    apikey: ALPHA_VANTAGE_KEY,
                },
            }
        );

        if (response.status !== 200)
            return res.status(response.status).json({ error: 'Failed to fetch data from Alpha Vantage' });

        if (Object.keys(response.data).length === 0)
            return res.status(404).json({ error: 'Ticker symbol not found.' });

        const companyOverview: CompanyOverview = {
            symbol: response.data.Symbol,
            name: response.data.Name,
            yearLow: parseFloat(response.data['52WeekLow']),
            yearHigh: parseFloat(response.data['52WeekHigh']),
            sector: response.data.Sector,
            dividendYield: parseFloat(response.data.DividendYield),
            marketCap: parseFloat(response.data.MarketCapitalization),
        };

        res.status(200).json(companyOverview);

    } catch (error) {
        console.error('Error fetching company overview:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export default handler;