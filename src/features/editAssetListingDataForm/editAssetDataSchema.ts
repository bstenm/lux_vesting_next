'use client';

import * as yup from 'yup';

import {
    minAssetPrice,
    maxAssetPrice,
    minColorLength,
    maxColorLength,
    minNameLength,
    maxNameLength,
    minMaterialLength,
    maxMaterialLength,
    minAssetDescription,
    maxAssetDescription
} from '@/config/formValues';

export const editAssetDataSchema = yup
    .object({
        price: yup.number().required().min(minAssetPrice).max(maxAssetPrice),
        casePrimaryColor: yup.string().required(),
        name: yup
            .string()
            .required()
            .min(minNameLength)
            .max(maxNameLength)
            .trim(),
        caseMaterial: yup
            .string()
            .required()
            .min(minMaterialLength)
            .max(maxMaterialLength)
            .trim(),
        description: yup
            .string()
            .required()
            .min(minAssetDescription)
            .max(maxAssetDescription)
            .trim()
    })
    .required();
