import {
    query,
    // addDoc,
    collection,
    DocumentData,
    SnapshotOptions,
    FirestoreDataConverter,
    QueryDocumentSnapshot
} from 'firebase/firestore';
import pick from 'lodash/pick';
import { useAlert } from '@/features/alert/useAlert';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import {
    getDocSnapshotData
    // setRecordWithIdAndDate
} from '@/libs/firestoreUtils';
import {
    UserHistoricalActivity,
    UserHistoricalActivityItem
} from '@/config/types/user';
import { db } from '@/libs/firebaseApp';
import { getUserId } from '@/state/user/selectors';
import { useAppSelector } from '@/libs/hooks/useAppSelector';
import { useAsyncAction } from '@/libs/hooks/useAsyncAction';

type Options = {
    silent?: boolean;
    throws?: boolean;
};

type HookLogic = {
    adding: boolean;
    fetching: boolean;
    activities?: UserHistoricalActivityItem[];
    addActivity: (record: UserHistoricalActivity) => void;
};

const activityConverter: FirestoreDataConverter<UserHistoricalActivityItem> = {
    toFirestore(activity: UserHistoricalActivityItem): DocumentData {
        return pick(activity, ['title', 'item', 'amount', 'createdAt']);
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): UserHistoricalActivityItem {
        const data = getDocSnapshotData<UserHistoricalActivityItem>(
            snapshot,
            options
        );
        return pick(data, ['id', 'title', 'item', 'amount', 'createdAt']);
    }
};

export const useUserHistoricalActivity = ({
    silent,
    throws
}: Options = {}): HookLogic => {
    const userId = useAppSelector(getUserId);

    const { errorAlert } = useAlert();

    const userActivityRef = collection(
        db,
        'users',
        userId,
        'activity'
    ).withConverter(activityConverter);

    const [activities, fetching, error] = useCollectionData(
        query(userActivityRef)
    );

    if (error && !silent) {
        errorAlert('errorRetrievingUserActivity');
        if (throws) {
            throw new Error(error.message);
        }
    }

    const addActivityAction = async (): // record: UserHistoricalActivity
    Promise<void> => {
        // await addDoc(userActivityRef, setRecordWithIdAndDate(record));
    };

    const [addActivity, adding] = useAsyncAction<UserHistoricalActivity, void>(
        addActivityAction,
        {
            error: 'errorAddingActivity',
            silent,
            throws
        }
    );

    return { adding, fetching, activities, addActivity };
};
