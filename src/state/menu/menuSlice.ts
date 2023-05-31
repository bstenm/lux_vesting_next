import { createSlice } from '@reduxjs/toolkit';

export type Menu = {
    open: boolean;
    collapsed: boolean;
};

const initialState: Menu = {
    open: false,
    collapsed: true
};

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        toggleOpen: (state): Menu => ({ ...state, open: !state.open }),
        toggleCollapse: (state): Menu => ({
            ...state,
            collapsed: !state.collapsed
        }),
        close: (state): Menu => ({ ...state, open: false }),
        collapse: (state, { payload }: { payload: boolean }): Menu => ({
            ...state,
            collapsed: payload
        })
    }
});

export const menuActions = menuSlice.actions;

export const menuReducer = menuSlice.reducer;
