// Write a footer nextjs 13 component with a link to private policy
import Link from 'next/link';
import startCase from 'lodash/startCase';

import { SITE_TITLE } from 'config/constants';
import { useTranslation } from 'react-i18next';
import { privacyPolicy } from 'pages/PrivacyPolicyPage';
import { contactUs } from 'pages/ContactUsPage';
import { loyaltyTiers } from 'pages/LoyaltyTiersPage';
import { faq } from 'pages/FAQPage';

export function Footer(): JSX.Element {
    const { t } = useTranslation();

    return (
        <div>
            <p>© 2023 {SITE_TITLE}</p>
            <Link href={privacyPolicy.path}>
                {startCase(t('privacyPolicy') ?? '')}
            </Link>
            <Link href={contactUs.path}>{startCase(t('contactUs') ?? '')}</Link>
            <Link href={loyaltyTiers.path}>
                {startCase(t('loyaltyTiers') ?? '')}
            </Link>
            <Link href={faq.path}>{startCase(t('faq') ?? '')}</Link>
        </div>
    );
}
