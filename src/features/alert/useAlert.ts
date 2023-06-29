'use client';

import capitalize from 'lodash/capitalize';
import { useTranslate } from '@/libs/hooks/useTranslate';

import { alertActions } from '@/state/alert/alertSlice';
import { useAppDispatch } from '@/libs/hooks/useAppDispatch';

type StateLogic = {
    infoAlert: (messageId: string) => void;
    errorAlert: (messageId?: string) => void;
    successAlert: (messageId: string) => void;
    closeAlert: () => void;
};

export const useAlert = (mute?: boolean): StateLogic => {
    const t = useTranslate();

    const dispatch = useAppDispatch();

    const openAlert = (messageId: string, type?: string): void => {
        if (mute) return;
        dispatch(
            alertActions.open({ message: capitalize(t(messageId)), type })
        );
    };

    const errorAlert = (messageId?: string): void =>
        openAlert(messageId ?? 'unexpectedError', 'error');

    const successAlert = (messageId: string): void =>
        openAlert(messageId, 'success');

    const infoAlert = (messageId: string): void => openAlert(messageId, 'info');

    const closeAlert = (): void => {
        dispatch(alertActions.close());
    };

    return { errorAlert, successAlert, infoAlert, closeAlert };
};
