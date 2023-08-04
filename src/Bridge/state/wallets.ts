import { /*createAsyncThunk,*/ createSlice } from '@reduxjs/toolkit';

export const walletSlice = createSlice({
    name: 'wallets',
    initialState: {
        account: '',
        accounts: [],
        balance: undefined,
        chainId: undefined,
        isMetamask: false,
        isConnected: false,
        selectedWallet: '',
    },
    reducers: {
        setAccounts: (state: any, action: { payload: []; }) => {
            state.accounts = action.payload;
            state.account = state.accounts[0];
            state.isConnected = true;
        },
        setBalance: (state: any, action: { payload: any; }) => {
            state.balance = action.payload;
        },
        setChainId: (state: any, action: { payload: any; }) => {
            state.chainId = action.payload;
        },
        setWallet: (state: any, action: { payload: string; }) => {
            state.selectedWallet = action.payload;
            if(action.payload === 'Metamask'){
                state.isMetamask = true;
            }else{
                state.isMetaMask = false;
            }
        }
    },
    // extraReducers: (builder: any) => {
    //     builder
    // }
});

export const {
    setAccounts,
    setBalance,
    setChainId,
    setWallet,
} = walletSlice.actions;