import { useDocumentData } from 'react-firebase-hooks/firestore';
import { DocumentReference, Timestamp } from 'firebase/firestore';

import { useAlert } from 'features/alert/useAlert';
import { HookOptions } from 'config/types';

type StateLogic<T> = [T, boolean];

export const useRealTimeFetchDocument = <T extends Record<string, unknown>>(
    docRef: DocumentReference<T>,
    errorMessage: string,
    { silent, throws }: HookOptions = {}
): StateLogic<T> => {
    const { errorAlert } = useAlert();

    const [result, fetching, error] = useDocumentData(docRef);

    if (error && !silent && !throws) {
        errorAlert(errorMessage);
    } else if (error && !silent) {
        throw new Error(error.message);
    }

    const item = result
        ? {
              ...result,
              createdAt: (result.createdAt as Timestamp).toMillis()
          }
        : {};

    return [item as T, fetching];
};
