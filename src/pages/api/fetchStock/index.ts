import { NextApiRequest, NextApiResponse } from 'next';

const mockStockData = {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 150.25,
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