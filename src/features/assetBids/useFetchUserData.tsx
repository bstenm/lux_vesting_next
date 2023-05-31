'use client';

import { User } from 'config/types/user';
import { HookOptions } from 'config/types';
import { useAsyncAction } from 'libs/hooks/useAsyncAction';
import { DatabaseService } from 'services/DatabaseService';

type Args = { id: string };

type StateLogic = [(args: Args) => Promise<User>, boolean];

export const useFetchUserData = (op: HookOptions = {}): StateLogic => {
    const action = async ({ id }: Args): Promise<User> =>
        DatabaseService.getUserById(id);

    const [fetchUserData, processing] = useAsyncAction<Args, User>(action, {
        error: 'errorRetrievingUsername',
        ...op
    });

    return [fetchUserData, processing];
};
