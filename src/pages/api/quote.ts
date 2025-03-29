import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import Quote from '@/models/quote';

const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET')
        return res.status(405).json({ error: 'Method not allowed' });

    const { ticker } = req.query;

    if (!ticker || typeof ticker !== 'string')
        return res.status(400).json({ error: 'Ticker symbol is required and must be a string' });

    try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
            params: {
                function: 'GLOBAL_QUOTE',
                symbol: ticker,
                apikey: ALPHA_VANTAGE_KEY,
            },
        });

        if (response.status !== 200)
            return res.status(response.status).json({ error: 'Failed to fetch data from Alpha Vantage' });

        const quoteData = response.data['Global Quote'];

        if (!quoteData || Object.keys(quoteData).length === 0)
            return res.status(404).json({ error: 'Ticker symbol not found.' });

        const quote: Quote = {
            symbol: quoteData['01. symbol'],
            price: parseFloat(quoteData['05. price']),
            changeDollar: parseFloat(quoteData['09. change']),
            changePercent: parseFloat(quoteData['10. change percent'].replace('%', '')),
            volume: parseInt(quoteData['06. volume'], 10),
            close: parseFloat(quoteData['08. previous close']),
        };

        res.status(200).json(quote);

    } catch (error) {
        console.error('Error fetching stock quote:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export default handler;
