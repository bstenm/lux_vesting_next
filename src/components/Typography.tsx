'use client';

import capitalize from 'lodash/capitalize';
import startCase from 'lodash/startCase';
import MuiTypography from '@mui/material/Typography';
import { useTranslate } from 'libs/hooks/useTranslate';

type Props = React.ComponentProps<typeof MuiTypography> & {
    title?: string;
    bold?: boolean;
    italic?: boolean;
    suffix?: string;
    textId?: string;
    children?: React.ReactNode;
    transVars?: Record<string, unknown>;
    capitalized?: boolean;
    uppercased?: boolean;
    showMissing?: boolean;
    allCapitalized?: boolean;
};

export function Typography({
    sx,
    title,
    bold,
    italic,
    suffix,
    textId,
    transVars,
    children,
    capitalized,
    uppercased,
    showMissing,
    allCapitalized,
    ...props
}: Props): JSX.Element {
    const t = useTranslate();

    if (showMissing)
        return (
            <MuiTypography
                variant="body1"
                sx={{ fontWeight: 300, fontStyle: 'italic' }}>
                {t('missingData')}
            </MuiTypography>
        );

    let text = textId ? t(textId, transVars || {}) : (children as string);

    if (capitalized && text) {
        text = capitalize(text);
    }

    if (allCapitalized && text) {
        text = startCase(text);
    }

    if (uppercased && text && text.toUpperCase) {
        text = text.toUpperCase();
    }

    return (
        <MuiTypography
            sx={{
                ...(sx ?? {}),
                fontStyle: italic ? 'italic' : 'normal',
                fontWeight: bold ? 'fontWeightBold' : 'fontWeightRegular'
            }}
            title={title && capitalize(t(title))}
            {...props}>
            {text}
            {suffix ?? ''}
        </MuiTypography>
    );
}
