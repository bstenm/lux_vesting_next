'use client';

import { object, number, string, ObjectSchema } from 'yup';

import {
    minAssetPrice,
    maxAssetPrice,
    minNameLength,
    maxNameLength,
    minAssetDescription,
    maxAssetDescription
} from '@/config/formValues';
import { AssetListingFormInput } from '@/config/types/asset';
import { assetColors, caseMaterials, braceletMaterials } from './selectOptions';

export const editAssetDataSchema: ObjectSchema<AssetListingFormInput> = object({
    price: number().required().min(minAssetPrice).max(maxAssetPrice),
    name: string().required().min(minNameLength).max(maxNameLength).trim(),
    caseMaterial: string().oneOf(caseMaterials).required(),
    casePrimaryColor: string().oneOf(assetColors).required(),
    caseSecondaryColor: string().oneOf(assetColors),
    braceletColor: string().oneOf(assetColors).required(),
    braceletMaterial: string().oneOf(braceletMaterials).required(),
    description: string()
        .required()
        .min(minAssetDescription)
        .max(maxAssetDescription)
        .trim()
}).required();
