import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type TChangeEVMChain = {
    ethereum: any,
    newChain: {
        chainName: string,
        chainId: number,
        nativeCurrency: {
            name: string,
            decimals: number,
            symbol: string
        },
        rpcUrls: string[]
    }
}

/**
 * Switches Metamask to another chain
 * @param params \{ethereum,newChain{chainId,chainName,nativeCurrency, rpcUrls}}
 * @returns params.newChain
 */
export const changeMetamaskAccount = createAsyncThunk('change-metamask-account', async (params:TChangeEVMChain):Promise<any> => {
    if(params.ethereum.networkVersion !== params.newChain.chainId){
        try {
            // Try switching to another chain
            await params.ethereum.request({
                method:'wallet_switchEthereumChain',
                params:[{chainId:params.newChain.chainId}]
            })
        } catch (err:any) {
            // If chain not added
            if(err.code === 4902){
                // Add new chain to metamask:
                await params.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params:[params.newChain]
                })
            }
        }
        return params.newChain
    }
});

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
        disconnect: (state:any) => {
            state.accounts = [];
            state.account = "";
            state.balance = undefined;
            state.isConnected = false;
            state.selectedWallet = '';
        },
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
    disconnect,
    setAccounts,
    setBalance,
    setChainId,
    setWallet,
} = walletSlice.actions;