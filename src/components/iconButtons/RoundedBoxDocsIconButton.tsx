'use client';

import { RoundedGreyBox } from 'components/RoundedGreyBox';
import { DocsIconButton } from './DocsIconButton';

export function RoundedBoxDocsIconButton(
    props: React.ComponentProps<typeof DocsIconButton>
): JSX.Element {
    return (
        <RoundedGreyBox>
            <DocsIconButton {...props} />
        </RoundedGreyBox>
    );
}
