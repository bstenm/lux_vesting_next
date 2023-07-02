'use client';

import { OrderResponseBody } from '@paypal/paypal-js/types/apis/orders';
import {
    OnApproveData,
    OnApproveActions,
    CreateOrderActions
} from '@paypal/paypal-js/types/components/buttons';

import { logger } from '@/libs/logger';
import { useAlert } from '@/features/alert/useAlert';
import { DEV_MODE } from '@/config/constants';
import { defaultCurrency } from '@/config';

type HookLogic = {
    onError: (e: unknown) => void;
    onCancel: () => void;
    onApprove: (
        data: OnApproveData,
        actions: OnApproveActions
    ) => Promise<void>;
    createOrder: (_: unknown, actions: CreateOrderActions) => Promise<string>;
};

type Args = {
    currency?: string;
    amount: number;
    onPaymentError?: (e: unknown) => void;
    onPaymentSuccess: () => void;
    onPaymentCancelled?: () => void;
};

const log = logger('Paypal');

export const usePaypal = ({
    amount,
    onPaymentError,
    onPaymentSuccess,
    onPaymentCancelled
}: Args): HookLogic => {
    const { errorAlert, successAlert } = useAlert();

    const onError = (e: unknown): void => {
        errorAlert('purchaseError');
        if (onPaymentError) onPaymentError(e);
        logger().error(e);
    };

    const onCancel = (): void => {
        if (onPaymentCancelled) onPaymentCancelled();
        errorAlert('purchaseCanceled');
    };

    const createOrder = async (
        _: unknown,
        actions: CreateOrderActions
    ): Promise<string> => {
        return actions.order.create({
            purchase_units: [
                {
                    description: 'Market Item',
                    amount: {
                        // TODO: Add ability to change currency
                        currency_code: defaultCurrency,
                        value: DEV_MODE ? '1' : amount.toString()
                    }
                }
            ],
            application_context: {
                shipping_preference: 'NO_SHIPPING'
            }
        });
    };

    const onApprove = async (
        data: OnApproveData,
        actions: OnApproveActions
    ): Promise<void> => {
        onPaymentSuccess();
        successAlert('successfulPurchase');
        const details: OrderResponseBody | undefined =
            await actions.order?.capture();
        log.debug(
            'Transaction completed',
            details,
            JSON.stringify(data, null, 2)
        );
    };

    return { createOrder, onApprove, onCancel, onError };
};
