'use client';

import { RoundedGreyBox } from '@/components/RoundedGreyBox';
import { RemoveIconButton } from './RemoveIconButton';

export function RoundedBoxRemoveIconButton(
    props: React.ComponentProps<typeof RemoveIconButton>
): JSX.Element {
    return (
        <RoundedGreyBox>
            <RemoveIconButton {...props} />
        </RoundedGreyBox>
    );
}
