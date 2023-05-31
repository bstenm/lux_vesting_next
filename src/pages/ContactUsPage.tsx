'use client';

import Card from '@mui/material/Card';
import Link from 'next/link';
import { Trans } from 'react-i18next';
import { styled } from '@mui/material/styles';

import { ContactForm } from 'features/contactForm/ContactForm';
import { StandardPage } from 'components/StandardPage';

const FormContainer = styled(Card)(({ theme }) => ({
    padding: 20,
    background: 'linear-gradient(180deg, #151516 33.58%, #343434 123.98%)',
    boxShadow: '1px 0px 10px rgba(0, 0, 0, 0.42)',
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
            <FormContainer>
                <ContactForm />
            </FormContainer>
        </StandardPage>
    );
}

const path = '/contact-us';

export const contactUs = { path, page: Page };
