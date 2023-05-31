'use client';

import {
    createTheme,
    ThemeOptions,
    ThemeProvider,
    responsiveFontSizes
} from '@mui/material/styles';
import { yellow } from '@mui/material/colors';
import { Provider } from 'react-redux';
import * as locales from '@mui/material/locale';
import CssBaseline from '@mui/material/CssBaseline';

import { store } from 'redux/store';
import { Layout } from 'layouts/Layout';
import { AlertSnackbar } from 'features/alert/AlertSnackbar';
import { AddFundsDrawer } from 'features/addFunds/AddFundsDrawer';

type Props = {
    children: React.ReactNode;
};

const theme: ThemeOptions = {
    zIndex: {
        // So it shows in a modal (Modal uses 5600)
        tooltip: 6000
    },
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
            secondary: '#aaa'
        },
        info: {
            main: yellow[300],
            contrastText: '#fff'
        },
        error: {
            // main: '#e23131'
            // main: '#ed1515'
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
    // TODO: get locale from i18next
    const themeWithLocale = createTheme(theme, locales.enUS);

    const responsiveTheme = responsiveFontSizes(themeWithLocale);

    return (
        <Provider store={store}>
            <ThemeProvider theme={responsiveTheme}>
                <CssBaseline />
                <Layout>{children}</Layout>
                <AlertSnackbar />
                <AddFundsDrawer />
            </ThemeProvider>
        </Provider>
    );
}
