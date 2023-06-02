'use client';

import Link from 'next/link';
import Card from '@mui/material/Card';
import { Trans } from 'react-i18next';
import { styled } from '@mui/material/styles';

import { ContactForm } from 'features/contactForm/ContactForm';
import { StandardPage } from 'components/StandardPage';

const FormContainer = styled(Card)(({ theme }) => ({
    padding: 20,
    bgcolor: '',
    borderRadius: 5,
    [theme.breakpoints.down('md')]: {
        width: '100%'
    }
}));

const FAQ = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.light,
    fontSize: '22px',
    textDecoration: 'underline'
}));

function Page(): JSX.Element {
    return (
        <StandardPage
            titleId="hereToHelp"
            subtitle={
                <Trans
                    i18nKey="faqPrompt"
                    components={{ to: <FAQ href="/faq" /> }}
                />
            }>
            <ContactForm />
        </StandardPage>
    );
}

const title = 'contactUs';

const path = '/contact-us';

export const contactUs = { path, title, page: Page };

export default Page;
