
interface NewsArticle {
    title: string;
    url: string;
    summary: string;
    status: 'positive' | 'negative' | 'neutral';
};

export default NewsArticle;