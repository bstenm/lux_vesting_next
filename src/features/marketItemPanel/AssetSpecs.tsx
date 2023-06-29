'use client';

import Stack from '@mui/material/Stack';

import { Row } from '@/components/Row';
import { AssetItem } from '@/config/types/asset';
import { Typography } from '@/components/Typography';
import { TitledDataPoint } from '@/components/dataPoints/TitledDataPoint';

type Props = {
    data: AssetItem;
};

export function AssetSpecs({ data }: Props): JSX.Element {
    return (
        <Stack spacing={4}>
            <Typography uppercased variant="h4">
                {data.name}
            </Typography>
            <Typography variant="subtitle2">{data.description}</Typography>
            <Row justifyContent="space-between">
                <TitledDataPoint data={data.color} textId="color" />
                <TitledDataPoint data={data.material} textId="material" />
                <TitledDataPoint data={data.wristLength} textId="wrist" />
            </Row>
        </Stack>
    );
}
