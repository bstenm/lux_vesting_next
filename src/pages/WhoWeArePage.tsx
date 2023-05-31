'use client';

import { Typography } from 'components/Typography';
import { StandardPage } from 'components/StandardPage';

function Page(): JSX.Element {
    return (
        <StandardPage titleId="whoWeAreTitle">
            <Typography variant="h6" textId="history1" />
            <Typography variant="h6" textId="history2" />
            <Typography variant="h6" textId="history3" />
        </StandardPage>
    );
}

const path = '/who-we-are';

export const whoWeAre = { path, page: Page };
