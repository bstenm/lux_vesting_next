'use client';

import Link from 'next/link';
import { Trans } from 'react-i18next';
import { styled } from '@mui/material/styles';

import { path } from '@/config/path';
import { ContactForm } from '@/features/contactForm/ContactForm';
import { StandardPage } from '@/components/StandardPage';

const FAQ = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: '22px',
    textDecoration: 'underline'
}));

function ContactUsPage(): JSX.Element {
    return (
        <StandardPage
            titleId="hereToHelp"
            subtitle={
                <Trans
                    i18nKey="faqPrompt"
                    components={{ to: <FAQ href={path.faq} /> }}
                />
            }>
            <ContactForm />
        </StandardPage>
    );
}

export default ContactUsPage;
