import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import NewsArticle from '@/models/news';

interface NewsState {
    articles: NewsArticle[];
    loading: boolean;
    error: string | null;
}

const initialState: NewsState = {
    articles: [],
    loading: false,
    error: null,
};

const fetchNews = createAsyncThunk('news/fetchNews', async (symbol: string) => {
    try {
        const response = await axios.get(`/api/news?ticker=${symbol}`);
        if (response.status !== 200)
            throw new Error('Failed to fetch news.');

        return response.data;
    }
    catch (error)
    {
        console.log(error);
    }
});

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNews.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(fetchNews.fulfilled, (state, action: PayloadAction<NewsArticle[]>) => {
            state.loading = false;
            state.articles = action.payload;
        });

        builder.addCase(fetchNews.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'An error occurred';
        });
    },
});

export { fetchNews };
export default newsSlice.reducer;
