'use client';

import { useState } from 'react';

import { logger } from '@/libs/logger';
import { useAlert } from '@/features/alert/useAlert';
import { userActions } from '@/state/user/userSlice';
import { useAppSelector } from '@/libs/hooks/useAppSelector';
import { useAsyncAction } from '@/libs/hooks/useAsyncAction';
import { useAppDispatch } from '@/libs/hooks/useAppDispatch';
import { tokenVendorContract } from '@/services/TokenVendorContractService';
import { useUserHistoricalActivity } from '@/libs/hooks/useUserHistoricalActivity';
import { getUserAccount, getUserBalance } from '@/state/user/selectors';
import { DOLLAR_TO_PROPRIETARY_CURRENCY } from '@/config/constants';

type HookLogic = {
    amount: number | undefined;
    tranferingTokens: boolean;
    changeAmount: (value: number) => void;
    onPaymentError: (e: unknown) => void;
    onCancelPayment: () => void;
    onPaymentCompleted: () => Promise<void>;
};

const log = logger('Buy Tokens');

export const useBuyTokens = (
    onSuccess: () => void,
    silent?: boolean
): HookLogic => {
    const dispatch = useAppDispatch();

    const account = useAppSelector(getUserAccount);

    const balance = useAppSelector(getUserBalance);

    const { addActivity } = useUserHistoricalActivity({ silent: true });

    const { infoAlert, errorAlert, successAlert } = useAlert(silent);

    const [amount, setAmount] = useState<number>(0);

    const changeAmount = (value: number): void => {
        setAmount(value);
    };

    const getTokens = async (): Promise<void> => {
        if (!amount) return;
        infoAlert('blockchainTransactionStarted');
        const nbOfTokens: number = amount * DOLLAR_TO_PROPRIETARY_CURRENCY;
        await tokenVendorContract.releaseTokens(account, nbOfTokens);
        log.debug('completed:', nbOfTokens.toString());
        dispatch(userActions.updateBalance(balance + nbOfTokens));
        setAmount(0);
        successAlert('tokenPurchaseSuccess');
        onSuccess();
        // Record user activity
        addActivity({ title: 'addFund', item: 'Paypal', amount });
    };

    const [onPaymentCompleted, tranferingTokens] = useAsyncAction<void, void>(
        getTokens,
        { error: 'tokenPurchaseError', silent }
    );

    const onPaymentError = (e: unknown): void => {
        errorAlert('tokenPurchaseError');
        log.error(e);
    };

    const onCancelPayment = (): void => {
        errorAlert('tokenPurchaseCancelled');
    };

    return {
        amount,
        changeAmount,
        tranferingTokens,
        onPaymentError,
        onCancelPayment,
        onPaymentCompleted
    };
};
