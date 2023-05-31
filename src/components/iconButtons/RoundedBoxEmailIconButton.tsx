'use client';

import { RoundedGreyBox } from 'components/RoundedGreyBox';
import { EmailIconButton } from './EmailIconButton';

export function RoundedBoxEmailIconButton(
    props: React.ComponentProps<typeof EmailIconButton>
): JSX.Element {
    return (
        <RoundedGreyBox>
            <EmailIconButton {...props} />
        </RoundedGreyBox>
    );
}
