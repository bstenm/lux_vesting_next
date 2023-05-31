/* eslint-disable no-param-reassign */
import { AssetItem } from 'config/types/asset';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AssetItem[] = [];

export const merchantAssetsSlice = createSlice({
    name: 'merchantAssets',
    initialState,
    reducers: {
        setAll: (_, { payload }) => payload ?? [],
        addAssets: (state, { payload }) => state.concat(payload ?? []),
        updateAssetData: (state, { payload: { id, data } }) => {
            const ind = state.findIndex((e) => e.id === id);
            if (ind > -1) {
                state[ind] = { ...state[ind], ...data };
            }
        },
        addMediasToAsset: (state, { payload: { assetId, medias } }) => {
            const asset = state.find((e) => e.id === assetId);
            if (asset) {
                asset.medias = (asset.medias || []).concat(medias);
            }
        }
    }
});

export const assetsActions = merchantAssetsSlice.actions;

export const merchantAssetsReducer = merchantAssetsSlice.reducer;
