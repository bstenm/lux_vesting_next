'use client';

import FormControl from '@mui/material/FormControl';
import { useContext } from 'react';
import LanguageIcon from '@mui/icons-material/Language';

import { Row } from '@/components/Row';
import { Option, CustomSelect } from '@/components/CustomSelect';
import { languages, defaultLng } from '@/config';
import { LangContext, LangContextType } from '@/libs/contexts';

export function LanguageSelect(): JSX.Element {
    const [lang, setLang] = useContext<LangContextType>(LangContext);

    const handleChange = (value: string | null): void => {
        setLang(value ?? defaultLng);
    };

    return (
        <Row
            alignItems="center"
            sx={{
                p: 0.6,
                zIndex: 1000,
                bgcolor: 'common.black',
                borderRadius: 1
            }}>
            <LanguageIcon fontSize="small" sx={{ color: 'primary.light' }} />
            <FormControl size="small">
                <CustomSelect value={lang} onChange={handleChange}>
                    {languages.map((e: string) => (
                        <Option
                            sx={{ display: e === lang ? 'none' : 'inherit' }}
                            key={e}
                            value={e}>
                            {e}
                        </Option>
                    ))}
                </CustomSelect>
            </FormControl>
        </Row>
    );
}
