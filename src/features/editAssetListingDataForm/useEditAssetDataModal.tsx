'use client';

import { useAlert } from 'features/alert/useAlert';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, UseFormReturn } from 'react-hook-form';

import { logger } from 'libs/logger';
import { RootState } from 'redux/store';
import { useAppSelector } from 'libs/hooks/useAppSelector';
import { useAsyncAction } from 'libs/hooks/useAsyncAction';
import { getAssetData } from 'state/assets/selectors';
import { useUpdateAssetData } from 'libs/hooks/useUpdateAssetData';
import { EditAssetDataFormInput } from 'config/types/asset';

import { editAssetDataSchema } from './editAssetDataSchema';

type StateLogic = {
    onClose: () => void;
    onSubmit: (data: EditAssetDataFormInput) => void;
    submitting: boolean;
    // eslint-disable-next-line @typescript-eslint/ban-types
    formMethods: UseFormReturn<EditAssetDataFormInput, object>;
};

type Options = {
    silent?: boolean;
};

const log = logger('useCreateAssetListingForm');

export const useEditAssetDataModal = (
    assetId: string,
    onSuccess: () => void,
    { silent = false }: Options = {}
): StateLogic => {
    const { successAlert } = useAlert(silent);

    const [updateAssetData] = useUpdateAssetData(assetId, { throws: true });

    const assetData = useAppSelector((state: RootState) =>
        getAssetData(state, assetId)
    );

    const formMethods = useForm<EditAssetDataFormInput>({
        resolver: yupResolver(editAssetDataSchema)
    });

    const onClose = (): void => {
        formMethods.reset();
        onSuccess();
    };

    const action = async (values: EditAssetDataFormInput): Promise<void> => {
        log.info('Submitting new product', values);
        await updateAssetData({ listing: { status: 'pending' }, ...values });
        successAlert('editSuccess');
        onSuccess();
    };

    const [onSubmit, submitting] = useAsyncAction<EditAssetDataFormInput, void>(
        action,
        { error: 'requestError', silent }
    );

    useEffect(() => {
        if (assetData) {
            formMethods.reset({
                color: assetData.color,
                price: assetData.price,
                name: assetData.name,
                material: assetData.material,
                description: assetData.description,
                wristLength: assetData.wristLength
            });
        }
    }, [assetData, formMethods]);

    return { onClose, onSubmit, submitting, formMethods };
};
