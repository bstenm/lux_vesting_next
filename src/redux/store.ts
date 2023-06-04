/* eslint-disable import/no-import-module-exports */
import logger from 'redux-logger';
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './reducers';

const isDev: boolean = process.env.NODE_ENV !== 'production';

export const store = configureStore({
    reducer: rootReducer(),
    middleware: (getDefaultMiddleware) =>
        isDev ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware()
});

if (isDev && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
