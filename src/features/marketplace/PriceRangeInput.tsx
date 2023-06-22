'use client';

import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { ChangeEvent } from 'react';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

import { Row } from 'components/Row';
import { AmountInput } from 'features/marketplace/AmountInput';

type Filter = { priceRangeTo?: string } | { priceRangeFrom?: string };

type Props = {
    toValue?: string;
    fromValue?: string;
    onSelect: (filter: Filter) => void;
};

export function PriceRangeInput({
    toValue,
    onSelect,
    fromValue
}: Props): JSX.Element {
    const onChangeTo = ({
        target: { value }
    }: ChangeEvent<HTMLInputElement>): void => {
        onSelect({ priceRangeTo: value });
    };

    const onChangeFrom = ({
        target: { value }
    }: ChangeEvent<HTMLInputElement>): void => {
        onSelect({ priceRangeFrom: value });
    };

    const reset = (): void => {
        onSelect({
            priceRangeTo: '',
            priceRangeFrom: ''
        });
    };

    return (
        <Box noValidate component="form" autoComplete="off">
            <Row
                sx={(theme) => ({ ...theme.filter, px: 1, width: 220 })}
                spacing={1}
                alignItems="center">
                <AmountInput
                    label="priceFrom"
                    input={fromValue}
                    onChange={onChangeFrom}
                />
                <HorizontalRuleIcon
                    sx={{
                        color: (theme) => theme.filter?.color,
                        fontSize: (theme) => theme.filter?.fontSize
                    }}
                />
                <AmountInput
                    label="priceTo"
                    input={toValue}
                    onChange={onChangeTo}
                />
                <CloseIcon fontSize="small" onClick={reset} />
            </Row>
        </Box>
    );
}
