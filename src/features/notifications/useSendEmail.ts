import { path } from '@/config/path';
import { logger } from '@/libs/logger';
import { SITE_URL } from '@/config/constants';
import { HookOptions } from '@/config/types';
import { SendEmailBody } from '@/app/api/email/route';
import { useAsyncAction } from '@/libs/hooks/useAsyncAction';

type HookLogic = [(args: SendEmailBody) => void, boolean];

const log = logger('Send Email');

export const useSendEmail = ({
    silent,
    throws
}: HookOptions = {}): HookLogic => {
    const sendMailUrl = `${SITE_URL}/${path.sendEmail}`;

    const error = 'errorSendingEmail';

    const action = async (args: SendEmailBody): Promise<void> => {
        log.debug('Sending email to', args.to);

        const body = JSON.stringify(args);

        const mode = 'no-cors'; // disable cors

        const method = 'POST';

        const headers = { 'Content-Type': 'application/json' };

        await fetch(sendMailUrl, { body, mode, method, headers });

        log.debug('Successfully sent  email to ', args.to);
    };

    return useAsyncAction<SendEmailBody, void>(action, {
        error,
        silent,
        throws
    });
};
