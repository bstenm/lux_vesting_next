'use client';

import * as yup from 'yup';

export const contactFormSchema = yup
    .object({
        email: yup.string().email().required().max(100).trim(),
        message: yup.string().required().min(2).max(500).trim(),
        lastName: yup.string().required().min(2).max(50).trim(),
        firstName: yup.string().required().min(2).max(50).trim()
    })
    .required();
