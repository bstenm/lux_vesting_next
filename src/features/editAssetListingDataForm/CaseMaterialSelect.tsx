'use client';

import { Path } from 'react-hook-form';

import { AssetColor } from '@/config/types/asset';

import { StandardFormSelect } from './StandardFormSelect';

type Props = Omit<React.ComponentProps<typeof StandardFormSelect>, 'options'>;

export const assetColors: AssetColor[] = [
    'black',
    'blue',
    'gold',
    'green',
    'rose',
    'silver',
    'white'
];

export const braceletMaterials: CaseMaterial[] = [
    'gold',
    'steel',
    'silver',
    'stainless steel'
];

export const caseMaterials: BraceletMaterial[] = [
    'gold',
    'steel',
    'silver',
    'leather',
    'stainless steel'
];

export function CaseMaterialSelect<T extends Record<string, unknown>>({
    name,
    ...props
}: Props): JSX.Element {
    return (
        <StandardFormSelect<T>
            name={name as Path<T>}
            options={caseMaterials.map((e) => ({
                label: e,
                value: e
            }))}
            {...props}
        />
    );
}
