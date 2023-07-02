import { useDocumentData } from 'react-firebase-hooks/firestore';
import { DocumentReference } from 'firebase/firestore';

import { useAlert } from '@/features/alert/useAlert';
import { HookOptions } from '@/config/types';

type HookLogic<T> = [T, boolean];

export const useRealTimeFetchDocument = <T extends Record<string, unknown>>(
    docRef: DocumentReference<T>,
    errorMessage: string,
    { silent, throws }: HookOptions = {}
): HookLogic<T> => {
    const { errorAlert } = useAlert();

    const [item, fetching, error] = useDocumentData(docRef);

    if (error && !silent && !throws) {
        errorAlert(errorMessage);
    } else if (error && !silent) {
        throw new Error(error.message);
    }

    return [item as T, fetching];
};
