'use client';

import Link from 'next/link';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Stack, Theme } from '@mui/material';

import { Row } from 'components/Row';
import { Image } from 'components/Image';
import { DarkButton } from 'components/buttons/DarkButton';
import { Typography } from 'components/Typography';
import { LightButton } from 'components/buttons/LightButton';
import { Web3Component } from 'features/authButton/Web3Component';

import { whoWeAre } from './WhoWeArePage';
import { marketplace } from './MarketplacePage';

type Props = {
    params: {
        lng: string;
    };
};

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
    top: 0,
    right: 0,
    width: '50%',
    height: '100vh',
    position: 'absolute',
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

function Page({ params: { lng } }: Props): JSX.Element {
    return (
        <Grid container>
            <Grid item sm={6} xs={12}>
                <Stack
                    sx={{
                        px: { sm: 1, md: 3 },
                        height: 'calc(100vh - 95px)'
                    }}
                    justifyContent="space-between">
                    <Title uppercased textId="appPurpose" />
                    <SubTitle textId="appDescription" />
                    <Row spacing={1} justifyContent="space-between">
                        <Web3Component>
                            {(initializing: boolean) => (
                                <Link href={`/${lng}${marketplace.path}`}>
                                    <StartTradingButton
                                        textId="startTrading"
                                        loading={initializing}
                                    />
                                </Link>
                            )}
                        </Web3Component>
                        <Link href={whoWeAre.path}>
                            <LearnMoreButton textId="learnMore" />
                        </Link>
                    </Row>
                </Stack>
            </Grid>
            <Grid item md={6} xs={12}>
                <Img uri="/assets/landingPageGraphic.png" alt="" />
            </Grid>
        </Grid>
    );
}

const path = '/';

export const landing = { path, Page };
