import {
    Hr,
    Img,
    Link,
    Text,
    Body,
    Html,
    Head,
    Button,
    Section,
    Preview,
    Container
} from '@react-email/components';

import { siteTitle } from '@/config';
import { VERCEL_URL } from '@/config/constants';

const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: 'Jost, "Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif'
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px'
};

const box = {
    padding: '0 48px'
};

const hr = {
    borderColor: '#e6ebf1',
    margin: '20px 0'
};

const paragraph = {
    color: '#525f7f',

    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'left' as const
};

const anchor = {
    color: '#556cd6'
};

const button = {
    backgroundColor: '#656ee8',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    width: '100%'
};

const footer = {
    color: '#8898aa',
    fontSize: '12px',
    lineHeight: '16px'
};

const baseUrl = VERCEL_URL ?? '../static';

export function CompanyWelcome(): JSX.Element {
    return (
        <Html>
            <Head />
            <Preview>You are now ready to trade on {siteTitle}!</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={box}>
                        <Img
                            alt={siteTitle}
                            src={`${baseUrl}/assets/company-logo.jpg`}
                            width="50"
                            height="50"
                        />
                        <Hr style={hr} />
                        <Text style={paragraph}>
                            Thank you for submitting your account information.
                            You are now ready to trade on {siteTitle}
                        </Text>
                        <Text style={paragraph}>
                            You can view your payments and a variety of other
                            information about your account right from your
                            dashboard.
                        </Text>
                        <Button
                            pX={10}
                            pY={10}
                            style={button}
                            href="https://dashboard.stripe.com/login">
                            View your Stripe Dashboard
                        </Button>
                        <Hr style={hr} />
                        <Text style={paragraph}>
                            If you have not finished your integration, you might
                            find our{' '}
                            <Link style={anchor} href="https://stripe.com/docs">
                                docs
                            </Link>{' '}
                            handy.
                        </Text>
                        <Text style={paragraph}>
                            Once you are ready to start accepting payments, you
                            will just need to use your live{' '}
                            <Link
                                style={anchor}
                                href="https://dashboard.stripe.com/login?redirect=%2Fapikeys">
                                API keys
                            </Link>{' '}
                            instead of your test API keys. Your account can
                            simultaneously be used for both test and live
                            requests, so you can continue testing while
                            accepting live payments. Check out our{' '}
                            <Link
                                style={anchor}
                                href="https://stripe.com/docs/dashboard">
                                tutorial about account basics
                            </Link>
                            .
                        </Text>
                        <Text style={paragraph}>
                            Finally, we have put together a{' '}
                            <Link
                                style={anchor}
                                href="https://stripe.com/docs/checklist/website">
                                quick checklist
                            </Link>{' '}
                            to ensure your website conforms to card network
                            standards.
                        </Text>
                        <Text style={paragraph}>
                            We will be here to help you with any step along the
                            way. You can find answers to most questions and get
                            in touch with us on our{' '}
                            <Link
                                style={anchor}
                                href="https://support.stripe.com/">
                                support site
                            </Link>
                            .
                        </Text>
                        <Text style={paragraph}>— The Stripe team</Text>
                        <Hr style={hr} />
                        <Text style={footer}>
                            Stripe, 354 Oyster Point Blvd, South San Francisco,
                            CA 94080
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

export default CompanyWelcome;
