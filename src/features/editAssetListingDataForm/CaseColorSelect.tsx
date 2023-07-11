'use client';

import { AssetColor, AssetListingFormInput } from '@/config/types/asset';

import { StandardFormSelect } from './StandardFormSelect';

const colors: AssetColor[] = [
    'black',
    'blue',
    'gold',
    'green',
    'rose',
    'silver',
    'white'
];

type Props = Omit<
    React.ComponentProps<typeof StandardFormSelect>,
    'name' | 'options'
>;

export function CaseColorSelect(props: Props): JSX.Element {
    return (
        <StandardFormSelect<AssetListingFormInput>
            name="casePrimaryColor"
            options={colors.map((color) => ({ label: color, value: color }))}
            {...props}
        />
    );
}
