'use client';

import { Row } from '@/components/Row';
import { Checkbox } from '@/components/Checkbox';
import { AssetItem } from '@/config/types/asset';
import { Typography } from '@/components/Typography';
import { BoxedSpinner } from '@/components/BoxedSpinner';
import { useUpdateAssetData } from '@/libs/hooks/useUpdateAssetData';

type Required<T> = {
    [P in keyof T]-?: T[P];
};

type BooleanPropertyNames<T> = {
    [K in keyof Required<T>]: Required<T>[K] extends boolean ? K : never;
}[keyof Required<T>];

type Props = {
    value?: boolean;
    assetId: string;
    property: BooleanPropertyNames<AssetItem>;
};

export function AdminAssetAuthenticationFormCheckbox({
    value,
    assetId,
    property
}: Props): JSX.Element {
    const [updateData, updating] = useUpdateAssetData(assetId);

    return (
        <Row alignItems="center">
            {updating ? (
                <BoxedSpinner size={42} />
            ) : (
                <Checkbox
                    onChange={() => updateData({ [property]: !value })}
                    defaultChecked={value}
                />
            )}
            <Typography capitalized textId={property} />
        </Row>
    );
}
