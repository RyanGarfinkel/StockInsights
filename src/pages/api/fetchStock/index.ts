import { NextApiRequest, NextApiResponse } from 'next';

const mockStockData = {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 150.25,
    history: [
        { date: '2023-01-01', price: 145.00 },
        { date: '2023-01-02', price: 146.50 },
        { date: '2023-01-03', price: 148.00 },
        { date: '2023-01-04', price: 149.50 },
        { date: '2023-01-05', price: 150.00 },
        { date: '2023-01-06', price: 151.25 },
        { date: '2023-01-07', price: 152.00 },
        { date: '2023-01-08', price: 153.50 },
        { date: '2023-01-09', price: 154.00 },
        { date: '2023-01-10', price: 155.25 },
        { date: '2023-01-11', price: 156.00 },
        { date: '2023-01-12', price: 157.50 },
    ]
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method !== 'GET')
    {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    res.status(200).json(mockStockData);
};

export default handler;