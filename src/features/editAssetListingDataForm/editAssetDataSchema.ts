'use client';

import * as yup from 'yup';

import {
    minAssetPrice,
    maxAssetPrice,
    minWristLength,
    maxWristLength,
    minAssetDescription,
    maxAssetDescription
} from '@/config/formValues';

export const editAssetDataSchema = yup
    .object({
        price: yup.number().required().min(minAssetPrice).max(maxAssetPrice),
        color: yup.string().required().min(2).trim(),
        name: yup.string().required().min(3).max(200).trim(),
        material: yup.string().required().min(2).trim(),
        description: yup
            .string()
            .required()
            .min(minAssetDescription)
            .max(maxAssetDescription)
            .trim(),
        wristLength: yup
            .number()
            .required()
            .min(minWristLength)
            .max(maxWristLength)
    })
    .required();
