import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const walletSlice = createSlice({
    name:'wallets',
    initialState:{
        account: '',
        accounts: [],
        approveSuccess: false,
        balance: undefined,
        isMetamask: false,
        isConnected: false,
    },
    reducers:{
        setIsConnected: (state: any, action: { payload: any; }) => {
            state.isConnected = action.payload;
        },
    },
    extraReducers: (builder: any) => {
        builder
    }
});

export const {
    setIsConnected
} = walletSlice.actions;