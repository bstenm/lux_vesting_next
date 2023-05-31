'use client';

import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { ChangeEvent } from 'react';

const Container = styled('div')(({ theme }) => ({
    '& .MuiSwitch-switchBase': {
        '&.Mui-checked': {
            '& + .MuiSwitch-track': {
                opacity: 0.5,
                backgroundColor: theme.palette.primary.light
            }
        }
    },
    '& .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.light,
        opacity: 0.5
    },
    '& .MuiSwitch-thumb': {
        color: theme.palette.primary.light,
        opacity: 0.8
    },
    [theme.breakpoints.down('md')]: {
        marginTop: 5,
        marginLeft: 10
    }
}));

type Props = {
    collapsed: boolean;
    onToggle: (value: boolean) => void;
};

export function CollapseSidebarButton({
    collapsed,
    onToggle
}: Props): JSX.Element {
    const onChange = (
        _: ChangeEvent<HTMLInputElement>,
        checked: boolean
    ): void => {
        onToggle(checked);
    };

    return (
        <Container>
            <Switch
                color="secondary"
                size="small"
                checked={collapsed}
                onChange={onChange}
            />
        </Container>
    );
}
