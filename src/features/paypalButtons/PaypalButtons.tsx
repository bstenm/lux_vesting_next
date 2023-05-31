'use client';

// TODO: error handling
import {
    PayPalButtons,
    PayPalScriptProvider,
    usePayPalScriptReducer
} from '@paypal/react-paypal-js';

import { usePaypal } from 'features/paypalButtons/usePaypal';
import { CenteredSpinner } from 'components/CenteredSpinner';
import { defaultCurrency } from 'config';

type PaypalButtonsProps = {
    amount: number;
    onError?: (e: unknown) => void;
    onCancel?: () => void;
    onSuccess: () => void;
    processingPurchase?: boolean;
};

type ButtonWrapperProps = {
    amount: number;
    processingPurchase?: boolean;
    onPaymentError?: (e: unknown) => void;
    onPaymentSuccess: () => void;
    onPaymentCancelled?: () => void;
};

function ButtonWrapper({
    amount,
    processingPurchase,
    onPaymentError,
    onPaymentSuccess,
    onPaymentCancelled
}: ButtonWrapperProps): JSX.Element {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ isPending }] = usePayPalScriptReducer();

    const { createOrder, onApprove, onCancel, onError } = usePaypal({
        amount,
        onPaymentError,
        onPaymentSuccess,
        onPaymentCancelled
    });

    return isPending || processingPurchase ? (
        <CenteredSpinner />
    ) : (
        <PayPalButtons
            style={{ layout: 'vertical', color: 'blue' }}
            onError={onError}
            onCancel={onCancel}
            onApprove={onApprove}
            createOrder={createOrder}
            // TODO: Add ability to change currency
            forceReRender={[amount, defaultCurrency]}
        />
    );
}

export function PaypalButtons({
    amount,
    onError,
    onCancel,
    onSuccess,
    processingPurchase
}: PaypalButtonsProps): JSX.Element {
    return (
        <PayPalScriptProvider
            options={{
                // TODO: Add ability to change currency
                currency: defaultCurrency,
                'client-id': 'test',
                components: 'buttons'
            }}>
            <ButtonWrapper
                amount={amount}
                processingPurchase={processingPurchase}
                onPaymentError={onError}
                onPaymentSuccess={onSuccess}
                onPaymentCancelled={onCancel}
            />
        </PayPalScriptProvider>
    );
}
