import sendgrid from '@sendgrid/mail';
import { render } from '@react-email/render';

import { CompanyWelcome } from '@/emails/CompanyWelcome';
import { MAIL_SERVICE_USER, SENDGRID_API_KEY } from '@/config/constants';

export type EmailTemplate = {
    newListing: {
        subject: string;
        component: () => JSX.Element;
    };
};

export type SendEmailBody = {
    to: string;
    template: keyof EmailTemplate;
};

const emailSpec: EmailTemplate = {
    newListing: {
        subject: 'Lux Vesting New Listing',
        component: CompanyWelcome
    }
};

export async function GET(req: Request): Promise<Response> {
    try {
        const from = MAIL_SERVICE_USER;

        sendgrid.setApiKey(SENDGRID_API_KEY);

        // const { to, template } = (await req.json()) as SendEmailBody;
        const to = 'bstenm@hotmail.com';

        const template = 'newListing';

        const { subject, component } =
            emailSpec[template as keyof EmailTemplate];

        const html = render(component());

        await sendgrid.send({ to, from, html, subject });

        return new Response(
            JSON.stringify({
                key: SENDGRID_API_KEY,
                from: MAIL_SERVICE_USER
            })
        );
    } catch (e) {
        return new Response(
            JSON.stringify({ error: (e as { message: string }).message })
        );
    }
}
