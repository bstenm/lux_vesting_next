'use client';

import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Popper, { PopperProps } from '@mui/material/Popper';

type Props = PopperProps & {
    open: boolean;
    children: React.ReactNode;
    anchorEl: HTMLButtonElement | null;
};

export function Popover({
    open,
    anchorEl,
    children,
    ...other
}: Props): JSX.Element {
    return (
        <Popper
            open={open}
            anchorEl={anchorEl}
            placement="bottom"
            transition
            {...other}>
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper>{children}</Paper>
                </Fade>
            )}
        </Popper>
    );
}
