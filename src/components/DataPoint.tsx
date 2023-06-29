'use client';

import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

import { Typography } from '@/components/Typography';

import { Spinner } from './Spinner';

type Props = React.ComponentProps<typeof Typography> & {
    data?: string | number;
    local?: boolean;
    suffix?: string;
    prefix?: string;
    fetching?: boolean;
    children?: React.ReactNode;
    showMissingMessage?: boolean;
};

export function DataPoint({
    data,
    suffix,
    prefix,
    children,
    fetching,
    local = true,
    showMissingMessage = false,
    ...other
}: Props): JSX.Element {
    if (fetching) {
        return <Spinner />;
    }

    if (!data && showMissingMessage) {
        return (
            <Typography
                sx={{ fontStyle: 'italic', color: 'text.secondary' }}
                textId="noData"
                variant="body2"
                capitalized
            />
        );
    }

    if (!data) {
        return (
            <HorizontalRuleIcon
                fontSize="small"
                sx={{ color: 'text.secondary' }}
            />
        );
    }

    if (children) {
        return <Typography {...other}>{children}</Typography>;
    }

    let entry =
        local && typeof data === 'number' ? data.toLocaleString() : data;

    if (suffix) entry = `${entry}${suffix}`;

    if (prefix) entry = `${prefix}${entry}`;

    return <Typography {...other}>{entry}</Typography>;
}
