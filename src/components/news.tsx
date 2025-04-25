import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { useEffect, useState } from 'react';


const News: React.FC = () => {

    const news = useSelector((state: RootState) => state.news);

    const [page, setPage] = useState(0);
    const [articles, setArticles] = useState(news.articles.slice(page * 3, Math.min(news.articles.length, (page + 1) * 3)));

    useEffect(() => {

        setArticles(news.articles.slice(page * 3, Math.min(news.articles.length, (page + 1) * 3)));
        console.log(news);
    }, [page, news]);

    return (
        <Card className="w-96">
            <CardHeader>
                <CardTitle>
                    News
                </CardTitle>
            </CardHeader>
            <CardContent>
                {
                    articles.map((article, index) => (
                        <div key={index} className="flex flex-col space-y-2">
                            <p className="font-bold">{article.title}</p>
                            <p>{article.summary}</p>
                            <p className={`text-sm ${article.status === 'positive' ? 'text-green-500' : article.status === 'negative' ? 'text-red-500' : 'text-gray-500'}`}>
                                {article.status}
                            </p>
                            {
                                index < articles.length - 1 && ( <Separator/> )
                            }
                        </div>
                    ))
                }
            </CardContent>
            <CardFooter>
                <div className="flex justify-between w-full">
                    {page > 0 && (
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => {
                                setPage(page - 1);
                                setArticles(news.articles.slice((page - 1) * 3, Math.min(news.articles.length, page * 3)));
                            }}
                        >
                            Previous
                        </button>
                    )}
                    {page < Math.ceil(news.articles.length / 3) - 1 && (
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => {
                                setPage(page + 1);
                                setArticles(news.articles.slice((page + 1) * 3, Math.min(news.articles.length, (page + 2) * 3)));
                            }}
                        >
                            Next
                        </button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
};

export default News;