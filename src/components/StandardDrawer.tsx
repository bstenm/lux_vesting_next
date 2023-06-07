'use client';

import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Drawer, { DrawerProps } from '@mui/material/Drawer';

import { BigMutedMessage } from 'components/typography/BigMutedMessage';
import { Centered } from './Centered';

type Align = 'center' | 'left' | 'right';

type Props = DrawerProps & {
    color?: string;
    width?: string;
    anchor?: 'bottom' | 'left' | 'right' | 'top' | undefined;
    noData?: boolean;
    textalign?: Align;
    padding?: number;
    gradientBg?: boolean;
    noCloseButton?: boolean;
    noDataMessage?: string;
    children: React.ReactNode;
    onClose: () => void;
};

const Content = styled(Box)<{
    color: string;
    width: string;
    textalign: Align;
    padding?: number;
}>`
    width: ${(props) => props.width};
    border-left: 1px solid #3c4858;
    padding: ${(props) => props.padding || '20px'};
    min-height: 100%;
    text-align: ${(props) => props.textalign};
    background: ${(props) => props.color};
`;

const gradient = 'linear-gradient(180deg, #3C4858 0%, #151516 58.85%)';

export function StandardDrawer({
    width = 'inherit',
    anchor = 'right',
    textalign = 'center',
    noData,
    onClose,
    padding,
    gradientBg,
    noCloseButton,
    noDataMessage,
    children,
    ...props
}: Props): JSX.Element {
    return (
        <Drawer
            sx={{ zIndex: 1400 }}
            anchor={anchor}
            onClose={onClose}
            {...props}>
            <PerfectScrollbar>
                <Content
                    color={gradientBg ? gradient : '#151515'}
                    width={width}
                    textalign={textalign}
                    padding={padding}>
                    {!noCloseButton && (
                        <IconButton
                            sx={{ position: 'fixed', top: 5, right: 5 }}
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
                </Content>
            </PerfectScrollbar>
        </Drawer>
    );
}
