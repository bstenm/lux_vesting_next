'use client';

import { RoundedGreyBox } from 'components/RoundedGreyBox';

import { CommentIconButton } from './CommentIconButton';

export function RoundedBoxCommentIconButton(
    props: React.ComponentProps<typeof CommentIconButton>
): JSX.Element {
    return (
        <RoundedGreyBox>
            <CommentIconButton {...props} />
        </RoundedGreyBox>
    );
}
