'use client';

import MuiCheckbox from '@mui/material/Checkbox';
import { useTranslate } from 'libs/hooks/useTranslate';
import FormControlLabel from '@mui/material/FormControlLabel';

type Props = React.ComponentProps<typeof MuiCheckbox> & {
    textId?: string;
    transVars?: Record<string, unknown>;
};

export function Checkbox({ textId, transVars, ...other }: Props): JSX.Element {
    const t = useTranslate();

    if (!textId) {
        return <MuiCheckbox {...other} />;
    }

    return (
        <FormControlLabel
            control={<MuiCheckbox {...other} />}
            label={t(textId, transVars)}
        />
    );
}
