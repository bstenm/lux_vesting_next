// Write a footer nextjs 13 component with a link to private policy
import Link from 'next/link';
import Stack from '@mui/material/Stack';

import { faq } from 'pages/FAQPage';
import { Row } from 'components/Row';
import { contactUs } from 'app/contact-us/page';
import { SITE_TITLE } from 'config/constants';
import { loyaltyTiers } from 'app/loyalty-tiers/page';
import { Typography } from 'components/Typography';
import { privacyPolicy } from 'app/privacy-policy/page';

export function Footer(): JSX.Element {
    return (
        <Stack
            sx={{
                pt: 2,
                mt: 2
            }}
            spacing={2}
            alignItems="center">
            <Row sx={{ width: '100%' }} justifyContent="space-evenly">
                {[privacyPolicy, contactUs, loyaltyTiers, faq].map((e) => (
                    <Link key={e.title} href={e.path}>
                        <Typography
                            sx={{
                                color: 'text.secondary',
                                '&:hover': {
                                    color: 'common.white'
                                }
                            }}
                            textId={e.title}
                            variant="caption"
                            allCapitalized
                        />
                    </Link>
                ))}
            </Row>
            <Typography sx={{ color: 'text.secondary' }} variant="caption">
                © 2023 {SITE_TITLE}
            </Typography>
        </Stack>
    );
}
