'use client';

import * as yup from 'yup';

import {
    minAssetPrice,
    maxAssetPrice,
    minNameLength,
    maxNameLength,
    minAssetDescription,
    maxAssetDescription
} from '@/config/formValues';
import { assetColors, caseMaterial, braceletMaterial } from './selectOptions';

export const editAssetDataSchema = yup
    .object({
        price: yup.number().required().min(minAssetPrice).max(maxAssetPrice),
        caseMaterial: yup.string().oneOf(caseMaterial).required(),
        casePrimaryColor: yup.string().oneOf(assetColors).required(),
        caseSecondaryColor: yup.string().oneOf(assetColors),
        braceletColor: yup.string().oneOf(assetColors),
        // braceletMaterial: yup.string().oneOf(braceletMaterial).required(),
        name: yup
            .string()
            .required()
            .min(minNameLength)
            .max(maxNameLength)
            .trim(),
        description: yup
            .string()
            .required()
            .min(minAssetDescription)
            .max(maxAssetDescription)
            .trim()
    })
    .required();
