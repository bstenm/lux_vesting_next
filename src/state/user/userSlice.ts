import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notifications: []
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: () => initialState,
        setInfo: (_, { payload }) => ({ ...initialState, ...payload }),
        updateData: (state, { payload }) => ({ ...state, ...payload }),
        updateBalance: (state, { payload }) => ({ ...state, balance: payload })
    }
});

export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;
