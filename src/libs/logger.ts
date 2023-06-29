/* eslint no-console: 0 */
import { getErrorMessage } from '@/libs/getErrorMessage';
import {
    DEV_MODE,
    PROD_MODE,
    SHOW_RENDERED,
    IS_TEST_NETWORK
} from '@/config/constants';

export type Logger = Record<string, (...args: unknown[]) => void>;

export const logger = (scope?: string): Logger => {
    const prefix = scope ? `${scope} :` : '';

    return {
        info(...args: unknown[]): void {
            console.info('[INFO] >', prefix, ...args);
        },
        error(e: unknown): void {
            const message = getErrorMessage(e);
            console.error('[ERROR] >', prefix, message);
        },
        rawError(...args: unknown[]): void {
            console.error('[ERROR] >', prefix, ...args);
        },
        debug(...args: unknown[]): void {
            if (DEV_MODE || IS_TEST_NETWORK) {
                console.debug(`%c[DEBUG] > ${prefix}`, 'color: blue', ...args);
            }
        },
        render(...args: unknown[]): void {
            if (!PROD_MODE && SHOW_RENDERED) {
                console.log(
                    `%c[RENDERED] %c> ${args[0]}`,
                    'margin-right: 5px; background: purple; color: #FFF',
                    'font-weight: bold; color: purple'
                );
            }
        }
    };
};
