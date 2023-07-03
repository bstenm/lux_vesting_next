'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, UseFormReturn } from 'react-hook-form';

import { AddNewAssetFormInput } from '@/config/types/asset';
import { useUserHistoricalActivity } from '@/libs/hooks/useUserHistoricalActivity';

import { useAddNewAsset } from './useAddNewAsset';
import { addNewAssetSchema } from './addNewAssetSchema';

type HookLogic = {
    onClose: () => void;
    onSubmit: (data: AddNewAssetFormInput) => void;
    submitting: boolean;
    // eslint-disable-next-line @typescript-eslint/ban-types
    formMethods: UseFormReturn<AddNewAssetFormInput, object>;
};

export const useAddNewAssetModal = (handleClose: () => void): HookLogic => {
    const { addActivity } = useUserHistoricalActivity({ silent: true });

    const [addNewAsset, submitting] = useAddNewAsset();

    const formMethods = useForm<AddNewAssetFormInput>({
        resolver: yupResolver(addNewAssetSchema)
    });

    const onSubmit: SubmitHandler<AddNewAssetFormInput> = async (values) => {
        await addNewAsset(values);
        // Record user activity
        addActivity({ title: 'addAsset', item: values.name });
        formMethods.reset();
        handleClose();
    };

    const onClose = (): void => {
        formMethods.reset();
        handleClose();
    };

    return { onClose, onSubmit, submitting, formMethods };
};
