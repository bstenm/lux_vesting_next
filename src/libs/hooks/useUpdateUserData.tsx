import { getUserId } from '@/state/user/selectors';
import { userActions } from '@/state/user/userSlice';
import { HookOptions } from '@/config/types';
import { DatabaseService } from '@/services/DatabaseService';

import { useAsyncAction } from './useAsyncAction';
import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';

type StateLogic = [(args: Record<string, unknown>) => Promise<void>, boolean];

export const useUpdateUserData = (op: HookOptions = {}): StateLogic => {
    const uid = useAppSelector(getUserId);

    const dispatch = useAppDispatch();

    const action = async (data: Record<string, unknown>): Promise<void> => {
        await DatabaseService.updateUserData(uid, data);
        dispatch(userActions.updateData(data));
    };

    const [updateUserData, processing] = useAsyncAction<
        Record<string, unknown>,
        void
    >(action, { error: 'errorUpdatingUserData', ...op });

    return [updateUserData, processing];
};
