import { TChainName, TokenBalanceObject } from 'emmet.sdk';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { detectEthereumProvider } from '../wallets/detectEthereumProvider';
import { getEvmAccounts } from '../wallets/getEvmAccounts';
import { getEvmBalance } from '../wallets/getEvmBalance';
import { getEvmTokenBalances } from '../wallets/getEvmTokenBalances';
import { getSelectedChain } from '../wallets/getSelectedChain';
import { getEvmTokenAllowances } from '../wallets/getEvmTokenAllowances'


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
export const changeMetamaskAccount = createAsyncThunk(
    'change-metamask-account',
    async (params: TChangeEVMChain): Promise<any> => {
        if (params.ethereum.networkVersion !== params.newChain.chainId) {
            try {
                // Try switching to another chain
                await params.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: params.newChain.chainId }]
                })
            } catch (err: any) {
                // If chain not added
                if (err.code === 4902) {
                    // Add new chain to metamask:
                    await params.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [params.newChain]
                    })
                }
            }
            return params.newChain
        }
    }
);

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
        balances[chain.nativeCurrency.symbol] = balance ? balance : '';
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
                state.error = "Wallet conncetion Failure";
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