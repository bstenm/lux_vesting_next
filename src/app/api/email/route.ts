import sendgrid from '@sendgrid/mail';
import { render } from '@react-email/render';

import { NewListingEmail } from 'features/emails/NewListingEmail';
import { MAIL_SERVICE_USER, SENDGRID_API_KEY } from 'config/constants';

export type EmailTemplate = {
    newListing: {
        subject: string;
        component: () => JSX.Element;
    };
};

const emailTemplateMap: EmailTemplate = {
    newListing: {
        subject: 'A Lux Vesting New Listing',
        component: NewListingEmail
    }
};

export async function POST(req: Request): Promise<Response> {
    try {
        const from = MAIL_SERVICE_USER;

        sendgrid.setApiKey(SENDGRID_API_KEY);

        const { to, template, subject } = await req.json();

        const html = render(
            emailTemplateMap[template as keyof EmailTemplate].component()
        );

        await sendgrid.send({ to, from, html, subject });

        return new Response(`${JSON.stringify({ success: true })}\n`);
    } catch (e) {
        return new Response(
            JSON.stringify({ error: (e as { message: string }).message })
        );
    }
}
