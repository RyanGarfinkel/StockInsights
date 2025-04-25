import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import History from '@/models/history';
import axios from 'axios';

interface HistoryState {
    history: History[];
    loading: boolean;
    error: string | null;
}

const initialState: HistoryState = {
    history: [],
    loading: false,
    error: null,
};

const fetchQuote = createAsyncThunk('history/fetchHistory', async (symbol: string) => {
    try
    {
        const response = await axios.get(`/api/quote?ticker=${symbol}`);
        if (response.status !== 200)
            throw new Error('Failed to fetch quote.');

        return response.data;
    }
    catch(error)
    {
        console.log(error);
    }
});

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchQuote.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(fetchQuote.fulfilled, (state, action: PayloadAction<History[]>) => {
            state.loading = false;
            state.history = action.payload;
        });

        builder.addCase(fetchQuote.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'An error occurred';
        });
    },
});

export { fetchQuote };
export default historySlice.reducer;
