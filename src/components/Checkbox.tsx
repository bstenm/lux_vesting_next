'use client';

import MuiCheckbox from '@mui/material/Checkbox';
import { useTranslation } from 'react-i18next';
import FormControlLabel from '@mui/material/FormControlLabel';

type Props = React.ComponentProps<typeof MuiCheckbox> & {
    textId?: string;
    transVars?: Record<string, unknown>;
};

export function Checkbox({ textId, transVars, ...other }: Props): JSX.Element {
    const { t } = useTranslation();

    if (!textId) {
        return <MuiCheckbox {...other} />;
    }

    return (
        <FormControlLabel
            control={<MuiCheckbox {...other} />}
            label={t(textId ?? '', transVars || {})}
        />
    );
}
