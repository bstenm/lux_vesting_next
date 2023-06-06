import { AlertColor } from '@mui/material/Alert';
import { createSlice } from '@reduxjs/toolkit';

export type AlertProps = {
    type: AlertColor;
    open: boolean;
    message: string;
};

const initialState: AlertProps = {
    open: false,
    message: '',
    type: 'error'
};

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        close: (): AlertProps => initialState,
        open: (state, { payload }): AlertProps => ({
            ...state,
            ...payload,
            open: true
        })
    }
});

export const alertActions = alertSlice.actions;

export const alertReducer = alertSlice.reducer;
