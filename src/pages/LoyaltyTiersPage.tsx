'use client';

import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { Card, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Tier } from 'config/types';
import { Row } from 'components/Row';
import GoldCoin from 'assets/tiers/gold.png';
import SilverCoin from 'assets/tiers/silver.png';
import PlatinumCoin from 'assets/tiers/platinum.png';
import { Typography } from 'components/Typography';
import { StandardPage } from 'components/StandardPage';
import { loyaltyBenefits } from 'config/loyaltyBenefits';
import { Caption } from 'components/Caption';

const tiers: { name: Tier; pic: string }[] = [
    { name: 'silver', pic: SilverCoin },
    { name: 'gold', pic: GoldCoin },
    { name: 'platinum', pic: PlatinumCoin }
];

const TierBox = styled(Card)({
    minWidth: 300,
    background: 'linear-gradient(180deg, #151516 33.58%, #343434 123.98%)',
    boxShadow: '1px 0px 10px rgba(0, 0, 0, 0.42)'
});

function Page(): JSX.Element {
    const { t } = useTranslation();

    return (
        <StandardPage
            noBox
            sx={{ width: '95%' }}
            titleId="eliteNFTLoyaltyTiers"
            subtitleId="loyaltyBenefits">
            <Row justifyContent="space-around" sx={{ pt: 4, flexWrap: 'wrap' }}>
                {tiers.map(({ pic, name }) => (
                    <TierBox key={name} sx={{ mb: 4 }}>
                        <Row
                            sx={{
                                p: 3,
                                borderBottom: (theme) =>
                                    `1px solid ${theme.palette.primary.light}`
                            }}
                            spacing={2}
                            alignItems="center"
                            justifyContent="center">
                            <img
                                width={60}
                                height={60}
                                src={pic}
                                alt={`${name}-coin-tier`}
                            />
                            <Typography
                                bold
                                uppercased
                                variant="h4"
                                textId={name}
                            />
                        </Row>
                        {loyaltyBenefits.map((d) => (
                            <Stack
                                sx={{ py: 2 }}
                                key={d.type}
                                alignItems="center">
                                <Typography
                                    bold
                                    sx={{ color: grey[500] }}
                                    textId={d.type}
                                />
                                <Typography
                                    textId={d[name].textId}
                                    transVars={d[name].vars}
                                />
                            </Stack>
                        ))}
                    </TierBox>
                ))}
            </Row>
            <Stack spacing={2}>
                <Caption>* {t('additionalServicesCondition')} *</Caption>
                <Caption>** {t('servicesWithoutLoyalty')} **</Caption>
            </Stack>
        </StandardPage>
    );
}

const path = '/loyalty-tiers';

export const loyaltyTiers = { path, page: Page };
