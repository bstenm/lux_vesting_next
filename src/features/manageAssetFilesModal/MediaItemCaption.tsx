'use client';

import { withEllipsis } from 'libs/utils';
import { Typography } from 'components/Typography';

type Props = {
    data: string;
};

export function MediaItemCaption({ data }: Props): JSX.Element {
    return (
        <Typography
            sx={{
                py: 0.5,
                px: 0.5,
                color: 'primary.light',
                width: 105,
                textAlign: 'center',
                bgcolor: 'common.black',
                opacity: 0.6
            }}
            uppercased
            variant="caption"
            title={data}>
            {withEllipsis(data, 20)}
        </Typography>
    );
}
