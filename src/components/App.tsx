'use client';

import {
    createTheme,
    ThemeOptions,
    ThemeProvider,
    responsiveFontSizes
} from '@mui/material/styles';
import { useMemo } from 'react';
import { yellow } from '@mui/material/colors';
import { Provider } from 'react-redux';
import * as locales from '@mui/material/locale';
import CssBaseline from '@mui/material/CssBaseline';
import { useTranslation } from 'react-i18next';

import { store } from 'redux/store';
import { Layout } from 'layouts/Layout';
import { defaultLng } from 'config';
import { AlertSnackbar } from 'features/alert/AlertSnackbar';
import { AddFundsDrawer } from 'features/addFunds/AddFundsDrawer';
import { LangContext, LangContextType } from 'libs/contexts';
import 'config/i18n';

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
            main: yellow[300],
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
            dark: '#274B73',
            light: '#A5CEE4',
            main: '#3C4858',
            contrastText: '#fff'
        },
        secondary: {
            dark: '#264257',
            light: '#876cc7',
            main: '#3C4858',
            contrastText: '#000'
        }
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
    );
}
