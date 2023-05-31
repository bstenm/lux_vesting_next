'use client';

import { useState } from 'react';

import { logger } from 'libs/logger';
import { useAlert } from 'features/alert/useAlert';
import { web3Service } from 'services/web3Service';
import { userActions } from 'state/user/userSlice';
import { useAppDispatch } from 'libs/hooks/useAppDispatch';

type StateLogic = [() => Promise<void>, boolean, boolean];

export const useTorusLogout = (): StateLogic => {
    const dispatch = useAppDispatch();

    const { errorAlert } = useAlert();

    const [loading, setLoading] = useState<boolean>(false);

    const [loggedOut, setLoggedOut] = useState<boolean>(false);

    const logout = async (): Promise<void> => {
        try {
            setLoading(true);
            await web3Service.logout();
            dispatch(userActions.reset());
            setLoggedOut(true);
        } catch (e) {
            errorAlert('logoutError');
            logger().error(e);
        } finally {
            setLoading(false);
            setLoggedOut(false);
        }
    };

    return [logout, loading, loggedOut];
};
