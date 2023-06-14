'use client';

import Box from '@mui/material/Box';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import { Theme, styled } from '@mui/material/styles';

import { path } from 'config/path';
import { Row } from 'components/Row';
import { Image } from 'components/Image';
import { DarkButton } from 'components/buttons/DarkButton';
import { Typography } from 'components/Typography';
import { LightButton } from 'components/buttons/LightButton';
import { Web3Component } from 'features/authButton/Web3Component';

const Title = styled(Typography)(({ theme }) => ({
    fontSize: '4.5vw',
    lineHeight: '7vw',
    letterSpacing: '0.1em',
    backgroundColor: theme.palette.common.black,
    [theme.breakpoints.down('sm')]: {
        zIndex: 100,
        padding: 15,
        fontSize: 33,
        lineHeight: '10vw',
        marginTop: 20
    }
}));

const SubTitle = styled(Typography)(({ theme }) => ({
    fontSize: 23,
    marginBottom: 10,
    backgroundColor: theme.palette.common.black,
    [theme.breakpoints.down('sm')]: {
        zIndex: 100,
        padding: 15,
        fontSize: 23
    }
}));

const Img = styled(Image)(({ theme }) => ({
    top: -5,
    right: 0,
    width: '50%',
    height: 'calc(100vh + 5px)',
    position: 'fixed',
    objectFit: 'cover',
    objectPosition: 'top',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        zIndex: 10
    }
}));

const ButtonTheme = ({ theme }: { theme: Theme }): Record<string, unknown> => ({
    padding: 10,
    fontSize: 20,
    [theme.breakpoints.down('sm')]: {
        zIndex: 100,
        padding: 5,
        fontSize: 20
    }
});

const StartTradingButton = styled(LightButton)(ButtonTheme);

const LearnMoreButton = styled(DarkButton)(ButtonTheme);

function LandingPage(): JSX.Element {
    return (
        <Box>
            <Stack
                sx={{
                    width: '45%',
                    height: 'calc(100vh - 95px)'
                }}
                justifyContent="space-between">
                <Title uppercased textId="appPurpose" />
                <SubTitle textId="appDescription" />
                <Row spacing={1} justifyContent="space-between">
                    <Web3Component>
                        {(initializing: boolean) => (
                            <Link href={path.marketplace}>
                                <StartTradingButton
                                    textId="startTrading"
                                    loading={initializing}
                                />
                            </Link>
                        )}
                    </Web3Component>
                    <Link href={path.whoWeAre}>
                        <LearnMoreButton textId="learnMore" />
                    </Link>
                </Row>
            </Stack>
            <Img uri="/assets/landing-page-graphic.png" alt="" />
        </Box>
    );
}

export default LandingPage;
