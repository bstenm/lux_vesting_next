'use client';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import capitalize from 'lodash/capitalize';
import Slide, { SlideProps } from '@mui/material/Slide';

import { RootState } from '@/redux/store';
import { AlertProps } from '@/state/alert/alertSlice';
import { useAppSelector } from '@/libs/hooks/useAppSelector';

import { useAlert } from './useAlert';

function SlideTransition(props: SlideProps): JSX.Element {
    return <Slide {...props} direction="right" />;
}

export function AlertSnackbar(): JSX.Element {
    const { closeAlert } = useAlert();

    const { type, message }: AlertProps = useAppSelector(
        (state: RootState) => state.alert
    );

    return (
        <Snackbar
            sx={{ zIndex: 10000 }}
            open={!!message}
            onClose={closeAlert}
            autoHideDuration={10000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            TransitionComponent={SlideTransition}>
            <Alert
                variant="filled"
                onClose={closeAlert}
                severity={type || 'error'}
                elevation={0}>
                {capitalize(message)}
            </Alert>
        </Snackbar>
    );
}
