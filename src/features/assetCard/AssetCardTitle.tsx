'use client';

import { withEllipsis } from '@/libs/utils';
import { Typography } from '@/components/Typography';

type Props = {
    title: string;
};

export function AssetCardTitle({ title }: Props): JSX.Element {
    return (
        <Typography
            uppercased
            sx={{
                height: 65,
                fontSize: 20,
                overflow: 'hidden',
                fontWeight: 300
            }}>
            {withEllipsis(title, 30)}
        </Typography>
    );
}
