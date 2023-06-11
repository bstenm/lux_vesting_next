import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useCallback, useState } from 'react';

import { Row } from 'components/Row';
import { menuActions } from 'state/menu/menuSlice';
import { useAppDispatch } from 'libs/hooks/useAppDispatch';
import { StandardDrawer } from 'components/StandardDrawer';

const Fade = styled('div')<{ out: number }>`
    animation: ${(props) => (props.out ? 'fadeOut' : 'fadeIn')} 0.3s linear;
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;

const BackButton = styled(Row)(
    ({ theme }) => `
    color: ${theme.palette.primary.light};
    cursor: pointer;
    position: relative;
    left: -10px;
`
);

type Props<T> = {
    leftPanelWidth?: number;
    rightPanelWidth?: number;
    noLeftPanelPadding?: boolean;
    noRightPanelPadding?: boolean;
    MainComponent: React.ElementType;
    leftPanelComponent: (value: T) => React.ReactElement;
    rightPanelComponent: (
        value: T,
        handleClose?: () => void
    ) => React.ReactElement;
};

export function ComponentWithSelectedDataInDrawer<
    T extends Record<string, unknown>
>({
    leftPanelWidth,
    rightPanelWidth,
    MainComponent,
    noLeftPanelPadding,
    noRightPanelPadding,
    leftPanelComponent,
    rightPanelComponent
}: Props<T>): JSX.Element {
    let leftBoxWidth = `${leftPanelWidth}px`;
    let rightBoxWidth = `${rightPanelWidth}px`;

    const dispatch = useAppDispatch();

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const [selectedItem, setSelectedItem] = useState<T>();

    const onCloseDrawer = (): void => {
        setDrawerOpen(false);
    };

    const onSelectitem = useCallback(
        (item: T): void => {
            setDrawerOpen(true);
            setSelectedItem(item);
            dispatch(menuActions.collapse(true));
        },
        [dispatch]
    );

    if (leftPanelWidth) {
        rightBoxWidth = `calc(100vw - ${leftPanelWidth + 80}px)`;
    } else if (rightPanelWidth) {
        leftBoxWidth = `calc(100vw - ${
            rightPanelWidth + (noLeftPanelPadding ? 50 : 70)
        }px)`;
    }

    return (
        <>
            <Fade out={+drawerOpen}>
                <MainComponent onSelectitem={onSelectitem} />
            </Fade>
            <StandardDrawer
                sx={{
                    position: 'static',
                    display: { xs: 'none', sm: 'block' }
                }}
                contentSx={{
                    p: noLeftPanelPadding ? 0 : 3,
                    color: 'common.black',
                    textalign: 'left'
                }}
                open={drawerOpen}
                anchor="left"
                onClose={onCloseDrawer}
                hideBackdrop>
                {selectedItem && (
                    <Box sx={{ width: leftBoxWidth }}>
                        {leftPanelComponent(selectedItem)}
                    </Box>
                )}
            </StandardDrawer>
            <StandardDrawer
                sx={{ position: 'static' }}
                contentSx={{
                    p: noRightPanelPadding ? 0 : 3,
                    color: 'common.black',
                    textAlign: 'left'
                }}
                open={drawerOpen}
                onClose={onCloseDrawer}
                hideBackdrop
                noCloseButton>
                <Box sx={{ width: rightBoxWidth }}>
                    <BackButton
                        sx={{ zIndex: 1000 }}
                        spacing={1}
                        onClick={onCloseDrawer}>
                        <ChevronLeftIcon />
                        <Typography
                            sx={{ color: 'primary.light' }}
                            variant="subtitle1">
                            Back
                        </Typography>
                    </BackButton>
                    {selectedItem &&
                        rightPanelComponent(selectedItem, onCloseDrawer)}
                </Box>
            </StandardDrawer>
        </>
    );
}
