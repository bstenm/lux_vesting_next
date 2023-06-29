'use client';

import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, UseFormReturn } from 'react-hook-form';

import { AddNewAssetFormInput } from '@/config/types/asset';
import { useUserHistoricalActivity } from '@/libs/hooks/useUserHistoricalActivity';

import { useAddNewAsset } from './useAddNewAsset';
import { addNewAssetSchema } from './addNewAssetSchema';

type StateLogic = {
    onClose: () => void;
    onSubmit: (data: AddNewAssetFormInput) => void;
    submitting: boolean;
    fileDropped: boolean;
    // eslint-disable-next-line @typescript-eslint/ban-types
    formMethods: UseFormReturn<AddNewAssetFormInput, object>;
    onFileDropped: () => void;
    onFileRemoved: () => void;
};

export const useAddNewAssetModal = (handleClose: () => void): StateLogic => {
    const { addActivity } = useUserHistoricalActivity({ silent: true });

    const [fileDropped, setFileDropped] = useState<boolean>(false);

    const onFileDropped = (): void => {
        setFileDropped(true);
    };

    const onFileRemoved = (): void => {
        setFileDropped(false);
    };

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
        setFileDropped(false);
        handleClose();
    };

    return {
        onClose,
        onSubmit,
        submitting,
        fileDropped,
        formMethods,
        onFileDropped,
        onFileRemoved
    };
};
