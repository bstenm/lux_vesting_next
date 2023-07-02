import { logger } from '@/libs/logger';
import { useAlert } from '@/features/alert/useAlert';
import { HookOptions } from '@/config/types';
import { HookActionError } from '@/libs/customErrors';
import { getErrorMessage } from '@/libs/getErrorMessage';

type HookLogic<T, V> = [(args: T) => V];

export const useAction = <T extends Record<string, unknown> | void, V>(
    action: (args: T) => V,
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
    const { infoAlert, errorAlert, successAlert } = useAlert();

    const execute = (args: T): V | undefined => {
        try {
            if (info && !silent) {
                infoAlert(info);
            }

            const result = action(args);

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
        }
    };

    return [execute as (args: T) => V];
};
