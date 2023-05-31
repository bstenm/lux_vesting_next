import { createSlice } from '@reduxjs/toolkit';

export type Props = {
    opened: boolean;
    content?: string;
};

const initialState: Props = {
    opened: false,
    content: ''
};

export const addFundsDrawerSlice = createSlice({
    name: 'addFundsDrawer',
    initialState,
    reducers: {
        open: (_, { payload }): Props => ({
            opened: true,
            content: payload
        }),
        close: (): Props => ({
            opened: false,
            content: ''
        })
    }
});

export const addFundsDrawerActions = addFundsDrawerSlice.actions;

export const addFundsDrawerReducer = addFundsDrawerSlice.reducer;
