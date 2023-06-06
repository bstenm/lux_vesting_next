'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { Row } from 'components/Row';
import { Space } from 'components/Space';
import { Typography } from 'components/Typography';
import { AmountInput } from 'features/addFunds/AmountInput';
import { PaypalButtons } from 'features/paypalButtons/PaypalButtons';
import { useAppSelector } from 'libs/hooks/useAppSelector';
import { getUserBalance } from 'state/user/selectors';
import { proprietaryCurrency } from 'config';
import { SpinnerWithMessage } from 'components/SpinnerWithMessage';
import WalletIcon from 'assets/wallet.svg';

import { useBuyTokens } from './useBuyTokens';

type Props = {
    handleClose: () => void;
};

export function AddFundsPanel({ handleClose }: Props): JSX.Element {
    const userBalance = useAppSelector(getUserBalance);

    const {
        amount,
        tranferingTokens,
        changeAmount,
        onPaymentError,
        onCancelPayment,
        onPaymentCompleted
    } = useBuyTokens(handleClose);

    return (
        <Box>
            <WalletIcon />
            <Space height="60px" />
            {tranferingTokens ? (
                <SpinnerWithMessage textId="gettingTokens" />
            ) : (
                <>
                    <Stack
                        sx={({ palette }) => ({
                            p: 2,
                            border: `1px solid ${palette.primary.light}`
                        })}
                        justifyContent="center"
                        spacing={2}>
                        <Typography
                            uppercased
                            variant="body2"
                            textId="currentBalance"
                        />
                        <Row
                            spacing={1}
                            alignItems="center"
                            justifyContent="center">
                            <Typography color="primary.light" variant="h6">
                                {userBalance}
                            </Typography>
                            <Typography variant="body2">
                                ({proprietaryCurrency})
                            </Typography>
                        </Row>
                    </Stack>
                    <Space height="60px" />
                    <AmountInput
                        amount={amount}
                        disabled={tranferingTokens}
                        onChange={changeAmount}
                    />
                    <Space height="20px" />
                    {/* Only show payment buttons if amount is defined */}
                    {!!amount && (
                        <PaypalButtons
                            amount={amount}
                            onError={onPaymentError}
                            onCancel={onCancelPayment}
                            // TODO: internationalization
                            onSuccess={onPaymentCompleted}
                        />
                    )}
                </>
            )}
        </Box>
    );
}
