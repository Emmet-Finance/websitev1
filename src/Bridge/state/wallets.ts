// External imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { 
    detectEthereumProvider,
    getEvmAccounts,
    getEvmBalance,
    getEvmTokenAllowances,
    getSelectedChain, 
    TChainName, 
    TokenBalanceObject
} from 'emmet.sdk';
import { getEvmTokenBalances } from 'emmet.sdk/utils/viem/getEvmTokenBalances';


export const connectWallet = createAsyncThunk('conncet-wallet', async (fromChain: TChainName) => {

    const chain = getSelectedChain(fromChain);
    
    const provider = await detectEthereumProvider();

    const chainid = chain.id;

    // Inject accounts
    const accounts: string[] = await getEvmAccounts(provider);

    // Get Native Coin Balance
    const balance: string | undefined = await getEvmBalance(accounts[0], provider);

    // Collect balances
    let balances: TokenBalanceObject | undefined = await getEvmTokenBalances(accounts[0], fromChain, provider);
    if (balances) {
        balances[chain.nativeCurrency.symbol] = balance ? BigInt(balance).toString() : '';
    }
    // Collect Allowances
    let allowances: TokenBalanceObject | undefined = await getEvmTokenAllowances(accounts[0], fromChain, provider);
    if (allowances) {
        allowances[chain.nativeCurrency.symbol] = BigInt(balance).toString();
    }

    return {
        accounts,
        allowances,
        balance,
        balances,
        chainid,
    }

});

export const walletSlice = createSlice({
    name: 'wallets',
    initialState: {
        account: '',
        accounts: [],
        allowances: {},
        balance: undefined,
        balances: {},
        chainId: undefined,
        isMetamask: false,
        isConnected: false,
        selectedWallet: '',
    },
    reducers: {
        disconnect: (state: any) => {
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
            if (action.payload === 'Metamask') {
                state.isMetamask = true;
            } else {
                state.isMetaMask = false;
            }
        },
        updateAllowances: (state: any, action: { payload: string; }) => {
            state.allowances = action.payload;
        }
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(connectWallet.fulfilled, (state: any, action: any) => {
                state.pending = false;
                const {
                    accounts,
                    allowances,
                    balance,
                    balances,
                    chainid,
                } = action.payload;

                state.account = accounts[0];
                state.accounts = accounts;
                state.balance = balance;
                state.balances = balances;
                state.allowances = allowances;
                state.chainId = chainid;
            })
            .addCase(connectWallet.pending, (state: any) => {
                state.pending = true;
                state.account = '';
                state.accounts = [];
                state.balance = '';
                state.balances = {};
                state.allowances = {};
                state.chainId = '';
                state.provider = undefined;
            })
            .addCase(connectWallet.rejected, (state: any) => {
                state.pending = false;
                state.account = '';
                state.accounts = [];
                state.balance = '';
                state.balances = {};
                state.allowances = {};
                state.chainId = '';
                state.error = "Wallet connection Failure";
                state.provider = undefined;
            })
    }
});

export const {
    disconnect,
    setAccounts,
    setBalance,
    setChainId,
    setWallet,
    updateAllowances,
} = walletSlice.actions;