'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { IconButton } from '@/components/iconButtons/IconButton';

type Props = {
    children?: React.ReactElement;
};

const Slide = styled(Box)<{ in: string }>`
    top: -113px;
    right: 0;
    position: absolute;
    animation: ${(props) => (props.in === 'true' ? 'slideIn' : 'slideOut')} 0.1s
        linear;
    animation-fill-mode: forwards;
    @keyframes slideIn {
        from {
            top: -113px;
        }
        to {
            top: 0;
        }
    }
    @keyframes slideOut {
        from {
            top: 0;
        }
        to {
            top: -113px;
        }
    }
`;

const ShowHeaderButton = styled(IconButton)`
    padding: 3px;
    background: #000;
    position: absolute;
    border-radius: 0px 0px 8px 8px;
    &:hover {
        background: #000;
    }
`;

export function ChatRoomPanelSlider({ children }: Props): JSX.Element {
    const [openHeader, setOpenHeader] = useState<boolean>(false);

    const handleChange = (): void => {
        setOpenHeader((prev) => !prev);
    };

    return (
        <Slide in={openHeader.toString()}>
            {children}
            <Stack sx={{ width: 35, ml: 3 }} alignItems="flex-start">
                <ShowHeaderButton onClick={handleChange}>
                    {!openHeader ? (
                        <KeyboardArrowDownIcon
                            sx={{ color: 'primary.light' }}
                        />
                    ) : (
                        <KeyboardArrowUpIcon sx={{ color: 'primary.light' }} />
                    )}
                </ShowHeaderButton>
            </Stack>
        </Slide>
    );
}
