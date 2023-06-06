'use client';

import Image from 'next/image';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import { useTranslate } from 'libs/hooks/useTranslate';

import { Tier } from 'config/types';
import { Row } from 'components/Row';
import { Caption } from 'components/Caption';
import { Typography } from 'components/Typography';
import { StandardPage } from 'components/StandardPage';
import { loyaltyBenefits } from 'config/loyaltyBenefits';

const tiers: { name: Tier; pic: string }[] = [
    { name: 'silver', pic: '/assets/tiers/gold.png' },
    { name: 'gold', pic: '/assets/tiers/gold.png' },
    { name: 'platinum', pic: '/assets/tiers/platinum.png' }
];

const TierBox = styled(Card)({
    minWidth: 300,
    background: 'linear-gradient(180deg, #151516 33.58%, #343434 123.98%)',
    boxShadow: '1px 0px 10px rgba(0, 0, 0, 0.42)'
});

function LoyaltyTiersPage(): JSX.Element {
    const t = useTranslate();

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
                            <Image
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

export default LoyaltyTiersPage;
