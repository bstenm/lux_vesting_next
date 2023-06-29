'use client';

import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, UseFormReturn } from 'react-hook-form';

import { ContactFormInput } from '@/config/types';

import { contactFormSchema } from './contactFormSchema';

const sendSupportMessage = (values: ContactFormInput): ContactFormInput =>
    values;

type StateLogic = {
    onSubmit: (data: ContactFormInput) => void;
    submitting: boolean;
    // eslint-disable-next-line @typescript-eslint/ban-types
    formMethods: UseFormReturn<ContactFormInput, object>;
};

export const useContractForm = (): StateLogic => {
    const [submitting, setSubmitting] = useState<boolean>(false);

    const formMethods = useForm<ContactFormInput>({
        resolver: yupResolver(contactFormSchema)
    });

    const onSubmit: SubmitHandler<ContactFormInput> = async (values) => {
        setSubmitting(true);
        // TODO: send support message
        sendSupportMessage(values);
        formMethods.reset();
        setSubmitting(false);
    };

    return { onSubmit, submitting, formMethods };
};
