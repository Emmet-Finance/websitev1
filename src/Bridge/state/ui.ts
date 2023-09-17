import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        errorMessage: '',
        isTransferReady: false,
        isBridgeFormVisible: true,
        isTxDetailVisible: false,
        needApproval: false,
    },
    reducers: {
        setErrorMessage: (state: any, action) => {
            state.errorMessage = action.payload;
        },
        setIsTransferReady: (state: any, action) => {
            state.isTransferReady = action.payload;
        },
        setIsBridgeFormVisible: (state: any) => {
            state.isBridgeFormVisible = true;
            state.isTxDetailVisible = false;
        },
        setIsTxDetailVisible: (state: any) => {
            state.isTxDetailVisible = true;
            state.isBridgeFormVisible = false;
        },
        setNeedApproval: (state: any, action) => {
            state.needApproval = action.payload;
        }
    }
});

export const {
    setErrorMessage,
    setIsTransferReady,
    setIsBridgeFormVisible,
    setIsTxDetailVisible,
    setNeedApproval,
} = uiSlice.actions;