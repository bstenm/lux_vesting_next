'use client';

import { RoundedGreyBox } from 'components/RoundedGreyBox';
import { ViewIconButton } from './ViewIconButton';

export function RoundedBoxViewIconButton(
    props: React.ComponentProps<typeof ViewIconButton>
): JSX.Element {
    return (
        <RoundedGreyBox>
            <ViewIconButton {...props} />
        </RoundedGreyBox>
    );
}
