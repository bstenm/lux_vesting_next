import { useState } from 'react';

import { logger } from '@/libs/logger';
import { HookOptions } from '@/config/types';
import { getErrorMessage } from '@/libs/getErrorMessage';

import { HookActionError } from '@/libs/customErrors';
import { useAlert } from '../../features/alert/useAlert';

type HookLogic<T, V> = [(args: T) => Promise<V>, boolean];

export const useAsyncAction = <T extends Record<string, unknown> | void, V>(
    action: (args: T) => Promise<V>,
    {
        info,
        error,
        silent,
        throws,
        success,
        onError,
        onSuccess
    }: HookOptions = {}
): HookLogic<T, V> => {
    const [processing, setProcessing] = useState<boolean>(false);

    const { infoAlert, errorAlert, successAlert } = useAlert();

    const execute = async (args: T): Promise<V | undefined> => {
        try {
            setProcessing(true);

            if (info && !silent) {
                infoAlert(info);
            }

            const result = await action(args);

            if (success && !silent) {
                successAlert(success);
            }

            if (onSuccess) {
                onSuccess();
            }

            return result;
        } catch (e) {
            if (e instanceof HookActionError && !silent && !throws) {
                errorAlert(e.message);
            } else if (error && !silent && !throws) {
                errorAlert(error);
            }

            if (throws) {
                throw new Error(getErrorMessage(e));
            }

            if (onError) {
                onError(e);
            }

            logger().error(e);

            return undefined;
        } finally {
            setProcessing(false);
        }
    };

    return [execute as (args: T) => Promise<V>, processing];
};
