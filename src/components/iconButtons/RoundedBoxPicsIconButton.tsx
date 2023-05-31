'use client';

import { RoundedGreyBox } from 'components/RoundedGreyBox';
import { CameraIconButton } from './CameraIconButton';

export function RoundedBoxPicsIconButton(
    props: React.ComponentProps<typeof CameraIconButton>
): JSX.Element {
    return (
        <RoundedGreyBox>
            <CameraIconButton {...props} />
        </RoundedGreyBox>
    );
}
