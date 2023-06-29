'use client';

import { RoundedGreyBox } from '@/components/RoundedGreyBox';
import { EditIconButton } from './EditIconButton';

export function RoundedBoxEditIconButton(
    props: React.ComponentProps<typeof EditIconButton>
): JSX.Element {
    return (
        <RoundedGreyBox>
            <EditIconButton {...props} />
        </RoundedGreyBox>
    );
}
