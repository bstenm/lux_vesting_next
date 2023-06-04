/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { AssetItem } from 'config/types/asset';

const initialState: AssetItem[] = [];

export const assetsSlice = createSlice({
    name: 'assets',
    initialState,
    reducers: {
        setList: (_, { payload }) => payload ?? [],
        updateData: (state, { payload: { id, data } }) => {
            const ind = state.findIndex((e) => e.id === id);
            if (ind > -1) {
                state[ind] = { ...state[ind], ...data };
            }
        },
        addAssets: (state, { payload }) => state.concat(payload ?? []),
        addMediasToAsset: (state, { payload: { assetId, medias } }) => {
            const asset = state.find((e) => e.id === assetId);
            if (asset) {
                asset.medias = (asset.medias || []).concat(medias);
            }
        }
    }
});

export const assetsActions = assetsSlice.actions;

export const assetsReducer = assetsSlice.reducer;
