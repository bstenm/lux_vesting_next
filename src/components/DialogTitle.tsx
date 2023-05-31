'use client';

import capitalize from 'lodash/capitalize';
import startCase from 'lodash/startCase';
import MuiDialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';

type Props = React.ComponentProps<typeof MuiDialogTitle> & {
    bold?: boolean;
    textId?: string | number;
    children?: React.ReactNode;
    capitalized?: boolean;
    uppercased?: boolean;
    allCapitalized?: boolean;
};

export function DialogTitle({
    textId,
    children,
    capitalized,
    uppercased,
    allCapitalized,
    ...props
}: Props): JSX.Element {
    const { t } = useTranslation();

    let text = textId ? t(textId.toString()) : (children as string);

    if (capitalized && text) {
        text = capitalize(text);
    }

    if (allCapitalized && text) {
        text = startCase(text);
    }

    if (uppercased && text && text.toUpperCase) {
        text = text.toUpperCase();
    }

    return <MuiDialogTitle {...props}>{text}</MuiDialogTitle>;
}
