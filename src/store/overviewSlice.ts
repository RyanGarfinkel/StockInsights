
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import CompanyOverview from '@/models/companyOverview';
import axios from 'axios';

interface OverviewState {
    overview: CompanyOverview | null;
    loading: boolean;
    error: string | null;
};

const initialState: OverviewState = {
    overview: null,
    loading: false,
    error: null,
};

const fetchOverview = createAsyncThunk('overview/fetchOverview', async (symbbol: string) => {

    try
    {
        const response = await axios.get(`/api/companyOverview?ticker=${symbbol}`);
        if(response.status !== 200)
            throw new Error('Failed to fetch company overview.');

        return response.data;
    } catch(error)
    {
        console.log(error);
    }
});

const overviewSlice = createSlice({
    name: 'overview',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOverview.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(fetchOverview.fulfilled, (state, action: PayloadAction<CompanyOverview>) => {
            state.loading = false;
            state.overview = action.payload;
        });

        builder.addCase(fetchOverview.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'An error occurred';
        });
    },
});

export { fetchOverview };
export default overviewSlice.reducer;