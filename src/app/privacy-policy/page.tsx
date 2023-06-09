'use client';

import { Typography } from '@/components/Typography';
import { StandardPage } from '@/components/StandardPage';

function PrivacyPolicyPage(): JSX.Element {
    return (
        <StandardPage titleId="privacyPolicy">
            {[
                'privacyProtection',
                'dataSecurity',
                'typesOfInfo1',
                'typesOfInfo2',
                'typesOfInfo3'
            ].map((textId) => (
                <Typography key={textId} variant="h6" textId={textId} />
            ))}
        </StandardPage>
    );
}

export default PrivacyPolicyPage;
