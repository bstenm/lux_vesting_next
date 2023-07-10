'use client';

import {
    createTheme,
    ThemeOptions,
    ThemeProvider,
    responsiveFontSizes
} from '@mui/material/styles';
import { Provider } from 'react-redux';
import * as locales from '@mui/material/locale';
import CssBaseline from '@mui/material/CssBaseline';
import { useMemo } from 'react';
import { purple, yellow } from '@mui/material/colors';
import { useTranslation } from 'react-i18next';
import { SessionProvider } from 'next-auth/react';

import { store } from '@/redux/store';
import { Layout } from '@/layouts/Layout';
import { defaultLng } from '@/config';
import { AlertSnackbar } from '@/features/alert/AlertSnackbar';
import { AddFundsDrawer } from '@/features/addFunds/AddFundsDrawer';
import { LangContext, LangContextType } from '@/libs/contexts';
import '@/config/i18n';

type Props = {
    children: React.ReactNode;
};

const theme: ThemeOptions = {
    typography: {
        allVariants: {
            color: 'white'
        },
        fontFamily: `"Jost",  sans-serif`,
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500
    },
    palette: {
        text: {
            disabled: '#555',
            secondary: '#aaa'
        },
        info: {
            dark: yellow[300],
            light: yellow[500],
            main: yellow[400],
            contrastText: '#fff'
        },
        error: {
            light: '#e71313',
            main: '#F45455'
        },
        success: {
            main: '#00e676'
        },
        primary: {
            dark: '#3C4858',
            '500': '#274B73',
            main: '#A5CEE4',
            contrastText: '#fff'
        },
        secondary: {
            // light: '#876cc7',
            '100': purple[100],
            '700': purple[700],
            dark: purple[300],
            light: purple[500],
            main: purple[300],
            contrastText: '#fff'
        }
    },
    filter: {
        color: '#CCC',
        border: '1px solid #CCC',
        bgcolor: '#000',
        fontSize: 14,
        borderHover: '1px solid #FFF',
        borderRadius: 0
    }
};

export function App({ children }: Props): JSX.Element {
    const { i18n } = useTranslation();

    const lang = i18n.language ?? defaultLng;

    // TODO: get locale from i18next
    const themeWithLocale = createTheme(theme, locales.enUS);

    const responsiveTheme = responsiveFontSizes(themeWithLocale);

    const lngCxtValue = useMemo(
        () => [lang, i18n.changeLanguage],
        [lang, i18n.changeLanguage]
    ) as LangContextType;

    return (
        <SessionProvider>
            <Provider store={store}>
                <LangContext.Provider value={lngCxtValue}>
                    <ThemeProvider theme={responsiveTheme}>
                        <CssBaseline />
                        <Layout>{children}</Layout>
                        <AlertSnackbar />
                        <AddFundsDrawer />
                    </ThemeProvider>
                </LangContext.Provider>
            </Provider>
        </SessionProvider>
    );
}
