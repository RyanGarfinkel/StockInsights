import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { GoogleGenAI } from "@google/genai";
import NewsArticle from '@/models/news';

const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_KEY;
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
   
    if (req.method !== 'GET')
        return res.status(405).json({ error: 'Method not allowed' });

    const { ticker } = req.query;

    if (!ticker || typeof ticker !== 'string')
        return res.status(400).json({ error: 'Ticker symbol is required and must be a string' });

    try
    {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
            params: {
                function: 'NEWS_SENTIMENT',
                tickers: ticker,
                apikey: ALPHA_VANTAGE_KEY,
            },
        });

        if (!response.data || response.status !== 200)
            return res.status(404).json({ error: 'Failed to fetch data from Alpha Vantage' });

        if (Object.keys(response.data).length === 0)
            return res.status(404).json({ error: 'Ticker symbol not found.' });

        const newsData = response.data.feed?.slice(0, 10) || [];
        // console.log('Fetched news data:', newsData);

        const prompt = `You are an AI assistant. Analyze and summarize the following news articles. Each article is represented as an object with "title" and "url". Return only valid JSON in the format: {"news": [{"summary": "string", "status": "positive" | "negative" | "neutral"}]}. Do not include any additional text or instructions.`;
        
        const result = await ai.models.generateContent({
            model: 'gemini-1.5-flash-001',
            contents: [
                {
                    text: prompt,
                    role: 'user',
                },
                {
                    text: JSON.stringify(newsData),
                    role: 'user',
                }
            ]
        });

        const cleanedText = result?.text?.replace(/```(?:json)?/g, '').trim();

        console.log('AI response:', cleanedText);
        const analysis = JSON.parse(cleanedText || '{}');

        if (!analysis || !Array.isArray(analysis.news))
            return res.status(500).json({ error: 'Failed to analyze news data' });

        const news: NewsArticle[] = newsData.map((item: { title: string; url: string; }, index: number) => ({
            title: item.title,
            url: item.url,
            summary: analysis.news[index]?.summary || 'No summary available',
            status: analysis.news[index]?.status || 'neutral',
        }));

        res.status(200).json({ news });
    }
    catch(error) 
    {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default handler;
