'use client';

import { Typography } from '@/components/Typography';
import { StandardPage } from '@/components/StandardPage';

function WhoWeArePage(): JSX.Element {
    return (
        <StandardPage titleId="whoWeAreTitle">
            <Typography variant="h6" textId="history1" />
            <Typography variant="h6" textId="history2" />
            <Typography variant="h6" textId="history3" />
        </StandardPage>
    );
}

export default WhoWeArePage;
