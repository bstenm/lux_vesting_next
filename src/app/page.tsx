'use client';

import { landing } from 'pages/LandingPage';

const { Page } = landing;

function HomePage(props: React.ComponentProps<typeof Page>): JSX.Element {
    return <Page {...props} />;
}

export default HomePage;
