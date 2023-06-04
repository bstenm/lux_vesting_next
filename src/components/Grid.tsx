'use client';

import MuiGrid from '@mui/material/Grid';
import capitalize from 'lodash/capitalize';
import { useTranslate } from 'libs/hooks/useTranslate';

type Props = React.ComponentProps<typeof MuiGrid> & {
    textId?: string;
    children?: React.ReactNode;
    capitalized?: boolean;
    uppercased?: boolean;
};

export function Grid({
    textId,
    capitalized,
    uppercased,
    children,
    ...props
}: Props): JSX.Element {
    const t = useTranslate();

    let text = textId && t(textId);

    if (capitalized && text) {
        text = capitalize(text);
    }

    if (uppercased && text) {
        text = text?.toUpperCase();
    }

    return <MuiGrid {...props}>{text ?? children}</MuiGrid>;
}
