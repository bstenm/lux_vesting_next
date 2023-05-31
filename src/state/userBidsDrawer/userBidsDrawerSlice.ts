import { createSlice } from '@reduxjs/toolkit';

export type Props = {
    opened: boolean;
    assetId: string;
};

const initialState: Props = {
    opened: false,
    assetId: ''
};

export const userBidsDrawerSlice = createSlice({
    name: 'userBidsDrawer',
    initialState,
    reducers: {
        open: (_, { payload }): Props => ({
            opened: true,
            assetId: payload.assetId
        }),
        close: (): Props => ({
            opened: false,
            assetId: ''
        })
    }
});

export const userBidsDrawerActions = userBidsDrawerSlice.actions;

export const userBidsDrawerReducer = userBidsDrawerSlice.reducer;
