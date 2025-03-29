import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import Quote from '@/models/quote';
import axios from 'axios';

interface QuoteState {
    quote: Quote | null;
    loading: boolean;
    error: string | null;
}

const initialState: QuoteState = {
    quote: null,
    loading: false,
    error: null,
};

const fetchQuote = createAsyncThunk('quote/fetchQuote', async (symbol: string) => {
    try {
        const response = await axios.get(`/api/quote?ticker=${symbol}`);
        if (response.status !== 200)
            throw new Error('Failed to fetch quote.');

        return response.data;
    }
    catch (error)
    {
        console.log(error);
    }
});

const quoteSlice = createSlice({
    name: 'quote',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchQuote.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(fetchQuote.fulfilled, (state, action: PayloadAction<Quote>) => {
            state.loading = false;
            state.quote = action.payload;
        });

        builder.addCase(fetchQuote.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'An error occurred';
        });
    },
});

export { fetchQuote };
export default quoteSlice.reducer;
