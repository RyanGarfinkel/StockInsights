import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface StockState {
    symbol: string;
    name: string;
    price: number;
    loading: boolean;
    error: string | null;
};

const initialState: StockState = {
    symbol: "",
    name: "",
    price: 0,
    loading: false,
    error: null,
};

export const fetchStock = createAsyncThunk('stock/fetchStock', async (symbol:string) => {
    try
    {
        const response = await fetch(`/api/fetchStock?symbol=${symbol}`);

        if(!response.ok)
            throw new Error('Failed to fetch stock data.');

        return await response.json();
    } catch(error)
    {
        console.log(error)
        return;
    }
});

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchStock.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchStock.fulfilled, (state, action: PayloadAction<StockState>) => {
            state.loading = false;
            state.symbol = action.payload.symbol;
            state.name = action.payload.name;
            state.price = action.payload.price;
        })
        .addCase(fetchStock.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default stockSlice.reducer;