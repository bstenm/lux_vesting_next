import { Query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { useAlert } from 'features/alert/useAlert';
import { HookOptions } from 'config/types';

type StateLogic<T> = [T[], boolean];

export const useRealTimeFetchCollection = <T extends Record<string, unknown>>(
    query: Query<T>,
    errorMessage: string,
    { silent, throws }: HookOptions = {}
): StateLogic<T> => {
    const { errorAlert } = useAlert();

    const [items, fetching, error] = useCollectionData(query);

    if (error && !silent && !throws) {
        errorAlert(errorMessage);
    } else if (error && !silent) {
        throw new Error(error.message);
    }

    return [(items as T[]) ?? [], fetching];
};
