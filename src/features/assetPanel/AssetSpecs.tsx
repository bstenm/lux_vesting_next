'use client';

import Stack from '@mui/material/Stack';
import { capitalize } from 'lodash';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Row } from '@/components/Row';
import { AssetItem } from '@/config/types/asset';
import { Typography } from '@/components/Typography';
import { TitledDataPoint } from '@/components/dataPoints/TitledDataPoint';

type Props = {
    data: AssetItem;
};

export function AssetSpecs({ data }: Props): JSX.Element {
    const [casePrimaryColor, caseSecondaryColor] = [
        data.casePrimaryColor,
        data.caseSecondaryColor
    ].map((e) => capitalize(e));

    const caseColor = !caseSecondaryColor
        ? casePrimaryColor
        : `${casePrimaryColor}/${caseSecondaryColor}`;

    return (
        <Stack spacing={4}>
            <Typography uppercased variant="h4">
                {data.name}
            </Typography>
            <Typography variant="subtitle2">{data.description}</Typography>
            <Stack spacing={2}>
                <Row justifyContent="space-around">
                    <TitledDataPoint data={caseColor} textId="caseColor" />
                    <TitledDataPoint
                        allCapitalized
                        data={data.caseMaterial}
                        textId="caseMaterial"
                    />
                </Row>
                <Row justifyContent="space-around">
                    <TitledDataPoint
                        allCapitalized
                        data={data.braceletColor}
                        textId="braceletColor"
                    />
                    <TitledDataPoint
                        allCapitalized
                        data={data.braceletMaterial}
                        textId="braceletMaterial"
                    />
                </Row>
            </Stack>
        </Stack>
    );
}
