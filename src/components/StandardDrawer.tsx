'use client';

import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Drawer, { DrawerProps } from '@mui/material/Drawer';

import { BigMutedMessage } from '@/components/typography/BigMutedMessage';

import { Centered } from './Centered';

type Props = DrawerProps & {
    color?: string;
    anchor?: 'bottom' | 'left' | 'right' | 'top' | undefined;
    noData?: boolean;
    contentSx?: Record<string, unknown>;
    transparent?: boolean;
    noCloseButton?: boolean;
    noDataMessage?: string;
    children: React.ReactNode;
    onClose: () => void;
};

export function StandardDrawer({
    anchor = 'right',
    noData,
    onClose,
    contentSx,
    transparent,
    noCloseButton,
    noDataMessage,
    children,
    ...props
}: Props): JSX.Element {
    return (
        <Drawer
            sx={{
                '& .MuiDrawer-paper': {
                    backgroundColor: transparent ? 'transparent' : 'inherit'
                }
            }}
            anchor={anchor}
            onClose={onClose}
            {...props}>
            <PerfectScrollbar>
                <Box
                    sx={{
                        p: 3,
                        pt: transparent ? 11 : 3,
                        bgcolor: transparent ? 'transparent' : '#151515',
                        textAlign: 'center',
                        minHeight: '100%',
                        borderLeft: transparent ? 'none' : '1px solid #3c4858',
                        ...contentSx
                    }}>
                    {!noCloseButton && (
                        <IconButton
                            sx={{
                                top: transparent ? 70 : 5,
                                right: 5,
                                bgcolor: '#252525',
                                position: 'fixed',
                                '&:hover': {
                                    bgcolor: '#353535'
                                }
                            }}
                            aria-label="close"
                            onClick={onClose}>
                            <CloseIcon
                                fontSize="small"
                                sx={{ color: grey[400] }}
                            />
                        </IconButton>
                    )}
                    {noData ? (
                        <Centered fullscreen>
                            <BigMutedMessage
                                sx={{ flexWrap: 'wrap', maxWidth: 250 }}
                                textId={noDataMessage ?? 'noData'}
                            />
                        </Centered>
                    ) : (
                        children
                    )}
                </Box>
            </PerfectScrollbar>
        </Drawer>
    );
}
