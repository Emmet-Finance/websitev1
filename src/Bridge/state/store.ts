// External imports
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
// Local imports
import { chainSlice } from './chains';
import { miscelaneousSlice } from './miscelaneous';
import { tokenSlice } from './tokens'
import { transactionSlice } from './transactions';
import { uiSlice } from './ui';
import { walletSlice } from './wallets';

// GLOBAL STORE:

const store = configureStore({
    reducer: {
        chains: chainSlice.reducer,
        miscelaneous: miscelaneousSlice.reducer,
        tokens: tokenSlice.reducer,
        transaction: transactionSlice.reducer,
        ui: uiSlice.reducer,
        wallets: walletSlice.reducer,
    },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// HOOKS: (instead of plain `useDispatch` and `useSelector`)
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector