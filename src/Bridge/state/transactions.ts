import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addCookie } from '../utils';
import { getTransaction, transferERC20 } from '../wallets/EVM';

export const sendInstallment = createAsyncThunk('send-installment', async (params: any) => {
    const txHash = await transferERC20(
        params.fromChain,
        params.toChain,
        params.fromTokens,
        params.transferAmount,
        params.destinationAddress
    );
    const TX = await getTransaction(
        params.fromChain,
        `0x${txHash.slice(2)}`
    );

    return {hash:txHash, status:TX.status}
})

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        approvedAmt: 0,
        approvedHash: '',
        approveSuccess: false,
        destinationAddress: '0x738b2B2153d78Fc8E690b160a6fC919B2C88b6A4',
        destinationFee: 0,
        destinationHash: '0x930769eba119329a318ca3ada312654b0aa721df516802d9d6303e7925ff305b',
        estimationDestination: "",
        estimationNative: "",
        nativeFee: 0,
        originalHash: '0x74ce66640f3558a6df42be4de5621ff9ebfc38f63a7e1360a0dd11bdaf796094',
        pending: false,
        requireApproval: false,
        receiveAmount:0,
        slippage: 0,
        transferAmount: 0,
        transferSuccess: false,
    },
    reducers: {
        setApprovedAmount: (state: any, action) => {
            state.approvedAmt = action.payload;
            if(state.transferAmount < state.approvedAmt){
                state.requireApproval = true;
            }else{
                state.requireApproval = false;
            }
        },
        setApprovedHash: (state: any, action) => {
            state.approvedHash = action.payload;
        },
        setApprovedSuccess: (state: any, action) => {
            state.approveSuccess = action.payload;
        },
        setDestinationAccount: (state: any, action) => {
            state.destinationAddress = action.payload;
            console.log("state.destinationAddress", state.destinationAddress)
            addCookie({
                key: "toAddress",
                value: action.payload,
                ...state.cookieExpires
            })
        },
        setDestinationFee: (state: any, action) => {
            state.destinationFee = action.payload;
        },
        setDestinationHash: (state: any, action) => {
            state.destinationHash = action.payload;
        },
        setNativeFee: (state: any, action) => {
            state.nativeFee = action.payload;
        },
        setOriginalHash: (state: any, action) => {
            state.originalHash = action.payload;
        },
        setPending: (state: any, action) => {
            state.pending = action.payload;
        },
        setReseiveAmount: (state: any, action) => {
            state.receiveAmount = action.payload;
        },
        setSlippage: (state: any, action) => {
            state.slippage = action.payload;
            addCookie({
                key: "slippage",
                value: action.payload,
                ...state.cookieExpires
            })
        },
        setTransferAmount: (state: any, action) => {
            state.transferAmount = action.payload;
            if(state.transferAmount < state.approvedAmt){
                state.requireApproval = true;
            }else{
                state.requireApproval = false;
            }
        },
        setTransferSuccess: (state: any, action) => {
            state.transferSuccess = action.payload;
        }
    },
    extraReducers: (builder: any) => {
        builder
        .addCase(sendInstallment.fulfilled, (state:any, action: any) => {
            const {hash, status} = action.payload
            state.originalHash = hash;
            state.transferSuccess = status;
            state.pending = false;
        })
        .addCase(sendInstallment.pending, (state:any) => {
            state.pending = true;
            state.originalHash = '';
            state.transferSuccess = '';
        })
        .addCase(sendInstallment.rejected, (state:any) => {
            state.pending = false;
            state.originalHash = '';
            state.transferSuccess = '';
        })
    }
});

export const {
    setApprovedAmount,
    setApprovedHash,
    setApprovedSuccess,
    setDestinationAccount,
    setDestinationFee,
    setDestinationHash,
    setNativeFee,
    setOriginalHash,
    setPending,
    setReseiveAmount,
    setSlippage,
    setTransferAmount,
    setTransferSuccess,
} = transactionSlice.actions;