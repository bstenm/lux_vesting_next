'use client';

import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import DialogContent from '@mui/material/DialogContent';

import { DialogTitle } from '@/components/DialogTitle';

type Props = React.ComponentProps<typeof Dialog> & {
    title?: string;
    open: boolean;
    children: React.ReactNode;
    minwidth?: string;
    handleClose?: () => void;
};

const RoundedDialog = styled(Dialog)<{ minwidth?: string }>(({ minwidth }) => ({
    '& .MuiDialog-paper': {
        minWidth: minwidth,
        borderRadius: '5px',
        background: 'transparent'
    }
}));

export function StandardModal({
    title,
    open,
    children,
    minwidth,
    handleClose,
    ...other
}: Props): JSX.Element {
    return (
        <RoundedDialog
            open={open}
            onClose={handleClose}
            minwidth={minwidth}
            {...other}>
            {title && (
                <DialogTitle
                    sx={{
                        textAlign: 'center',
                        background:
                            // eslint-disable-next-line max-len
                            'linear-gradient(89.95deg, #264257 0.03%, #151516 99.96%)'
                    }}
                    textId={title}
                    allCapitalized
                />
            )}
            <DialogContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 400,
                    minHeight: 200,
                    background:
                        'linear-gradient(180deg, #3C4858 0%, #151516 58.85%)'
                }}>
                {children}
            </DialogContent>
        </RoundedDialog>
    );
}
