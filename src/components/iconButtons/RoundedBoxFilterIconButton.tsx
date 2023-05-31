'use client';

import { RoundedGreyBox } from 'components/RoundedGreyBox';
import { FilterIconButton } from './FilterIconButton';

export function RoundedBoxFilterIconButton(
    props: React.ComponentProps<typeof FilterIconButton>
): JSX.Element {
    return (
        <RoundedGreyBox sx={{ width: 80 }}>
            <FilterIconButton {...props} />
        </RoundedGreyBox>
    );
}
