import Link from 'next/link';
import Stack from '@mui/material/Stack';

import { Row } from '@/components/Row';
import { path } from '@/config/path';
import { SITE_TITLE } from '@/config/constants';
import { Typography } from '@/components/Typography';

export function Footer(): JSX.Element {
    return (
        <Stack sx={{ py: 2, mt: 2 }} spacing={2} alignItems="center">
            <Row sx={{ width: '100%' }} justifyContent="space-evenly">
                {['privacyPolicy', 'contactUs', 'loyaltyTiers', 'faq'].map(
                    (e) =>
                        path[e] ? (
                            <Link key={e} href={path[e]}>
                                <Typography
                                    sx={{
                                        color: 'text.secondary',
                                        '&:hover': {
                                            color: 'common.white'
                                        }
                                    }}
                                    textId={e}
                                    variant="caption"
                                    allCapitalized
                                />
                            </Link>
                        ) : (
                            <div key={e} />
                        )
                )}
            </Row>
            <Typography sx={{ color: 'text.secondary' }} variant="caption">
                © 2023 {SITE_TITLE}
            </Typography>
        </Stack>
    );
}
