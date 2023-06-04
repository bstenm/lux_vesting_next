'use client';

import { TestFunction } from 'yup';

import { yupLocale as yup } from 'config/yup';
import { isValidPictureFileType } from 'libs/utils';

export const addNewAssetSchema = yup
    .object({
        name: yup.string().required().min(3).max(200).trim(),
        picture: yup
            .mixed()
            .required()
            .test(
                'file_type_validation',
                'Invalid file type',
                isValidPictureFileType as TestFunction
            )
    })
    .required();
