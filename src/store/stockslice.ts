import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface StockState {
    symbol: string;
    name: string;
    price: number;
    dayChangeDollar: number;
    dayChangePercent: number;
    volume: number;
    marketCap: number;
    week52Low: number;
    week52High: number;
    dividendYield: number;
    sector: string;
    history: { date: string, price: number }[];

    loading: boolean;
    error: string | null;
};

const initialState: StockState = {
    symbol: "",
    name: "",
    price: 0,
    dayChangeDollar: 0,
    dayChangePercent: 0,
    volume: 0,
    marketCap: 0,
    week52Low: 0,
    week52High: 0,
    dividendYield: 0,
    sector: "",
    history: [],

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
            state.error = null;

            state.symbol = action.payload.symbol;
            state.name = action.payload.name;
            state.price = action.payload.price;
            state.dayChangeDollar = action.payload.dayChangeDollar;
            state.dayChangePercent = action.payload.dayChangePercent;
            state.volume = action.payload.volume;
            state.marketCap = action.payload.marketCap;
            state.history = action.payload.history;
            state.week52Low = action.payload.week52Low;
            state.week52High = action.payload.week52High;
            state.dividendYield = action.payload.dividendYield;
            state.sector = action.payload.sector;
        })
        .addCase(fetchStock.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default stockSlice.reducer;