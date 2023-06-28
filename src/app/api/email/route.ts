import sendgrid from '@sendgrid/mail';
import { render } from '@react-email/render';

import { NewListingEmail } from 'emails/NewListingEmail';
import { MAIL_SERVICE_USER, SENDGRID_API_KEY } from 'config/constants';

export async function POST(req: Request): Promise<Response> {
    try {
        const from = MAIL_SERVICE_USER;

        const { to, subject } = await req.json();

        const html = render(NewListingEmail());

        sendgrid.setApiKey(SENDGRID_API_KEY);

        const response = await sendgrid.send({ to, from, html, subject });

        return new Response(JSON.stringify(response));
    } catch (e) {
        return new Response(`Error ${JSON.stringify(e)}`);
    }
}
