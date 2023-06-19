'use client';

import Box from '@mui/material/Box';
import { ThemeOptions } from '@mui/material';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

import { Row } from 'components/Row';
import { Space } from 'components/Space';
import { Typography } from 'components/Typography';
import { AmountInput } from 'features/marketplace/AmountInput';

type Filter = { priceRangeTo?: number } | { priceRangeFrom?: number };

type Props = {
    onSelect: (filter: Filter) => void;
};

export function PriceRangeInput({ onSelect }: Props): JSX.Element {
    const onChangeTo = (value?: number): void => {
        onSelect({ priceRangeTo: value });
    };

    const onChangeFrom = (value?: number): void => {
        onSelect({ priceRangeFrom: value });
    };

    const textStyle = {
        color: (theme: ThemeOptions) => theme.filter?.color,
        fontSize: (theme: ThemeOptions) => theme.filter?.fontSize
    };

    return (
        <Box noValidate component="form" autoComplete="off">
            <Row sx={{ width: 290 }} spacing={1} alignItems="center">
                <Typography sx={textStyle} textId="priceRange" capitalized />
                <Space width={3} />
                <AmountInput label="from" onChange={onChangeFrom} />
                <HorizontalRuleIcon sx={textStyle} />
                <AmountInput label="to" onChange={onChangeTo} />
            </Row>
        </Box>
    );
}
