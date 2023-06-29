import { combineReducers, Reducer } from '@reduxjs/toolkit';

import { userReducer } from '@/state/user/userSlice';
import { alertReducer } from '@/state/alert/alertSlice';
import { menuReducer } from '@/state/menu/menuSlice';
import { assetsReducer } from '@/state/assets/assetsSlice';
import { userBidsDrawerReducer } from '@/state/userBidsDrawer/userBidsDrawerSlice';
import { addFundsDrawerReducer } from '@/state/addFundsDrawer/addFundsDrawerSlice';

export const rootReducer = (): Reducer =>
    combineReducers({
        user: userReducer,
        alert: alertReducer,
        menu: menuReducer,
        assets: assetsReducer,
        userBidsDrawer: userBidsDrawerReducer,
        addFundsDrawer: addFundsDrawerReducer
    });
