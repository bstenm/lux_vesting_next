'use client';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, UseFormReturn } from 'react-hook-form';

import {
    minDenialReasonsLength,
    maxDenialReasonsLength
} from '@/config/formValues';
import { useAsyncAction } from '@/libs/hooks/useAsyncAction';

export type FormInput = {
    denialNotes: string;
};

type Props = {
    onSave: (notes?: string) => void;
    onCancel: () => void;
};

type HookLogic = {
    onClose: () => void;
    onSubmit: (data: FormInput) => void;
    submitting: boolean;
    // eslint-disable-next-line @typescript-eslint/ban-types
    formMethods: UseFormReturn<FormInput, object>;
};

const formSchema = yup
    .object({
        denialNotes: yup
            .string()
            .required()
            .min(minDenialReasonsLength)
            .max(maxDenialReasonsLength)
    })
    .required();

export const useDenialNotesForm = ({ onSave, onCancel }: Props): HookLogic => {
    const formMethods = useForm<FormInput>({
        resolver: yupResolver(formSchema)
    });

    const onClose = (): void => {
        formMethods.reset();
        onCancel();
    };

    const action = async (values: FormInput): Promise<void> => {
        const { denialNotes } = values;
        onSave(denialNotes);
    };

    const [onSubmit, submitting] = useAsyncAction<FormInput, void>(action, {
        error: 'requestError'
    });

    return { onClose, onSubmit, submitting, formMethods };
};
