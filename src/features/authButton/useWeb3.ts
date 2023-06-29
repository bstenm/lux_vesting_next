'use client';

import { UserInfo } from '@toruslabs/torus-embed';
import { useEffect } from 'react';

import { User } from '@/config/types/user';
import { getUserId } from '@/state/user/selectors';
import { userActions } from '@/state/user/userSlice';
import { web3Service } from '@/services/web3Service';
import { tokenContract } from '@/services/TokenService';
import { useAsyncAction } from '@/libs/hooks/useAsyncAction';
import { useAppSelector } from '@/libs/hooks/useAppSelector';
import { useAppDispatch } from '@/libs/hooks/useAppDispatch';
import { DatabaseService } from '@/services/DatabaseService';
import { RecordNotFoundError } from '@/libs/customErrors';

type AuthLogic = {
    login: () => Promise<void>;
    logout: () => Promise<void>;
    loggedIn: boolean;
    initializing: boolean;
    processing: boolean;
};

export const useWeb3 = (): AuthLogic => {
    const userId = useAppSelector(getUserId);

    const dispatch = useAppDispatch();

    const setUserData = async (): Promise<void> => {
        // const { email } = await web3Service.api.getUserInfo('');
        const email = 'bstenmm@gmail.com';
        // Get the user data from database for this account
        const user: User = await DatabaseService.getUserByEmail(email);
        // Get the user's balance from the blockchain
        // const balance: string = await tokenContract.getBalance(user.account);
        // Set global state user data
        dispatch(userActions.setInfo({ ...user, balance: 0 }));
    };

    const loginAction = async (): Promise<void> => {
        // Open web3 provider login popup
        const account = await web3Service.login();
        // Retrieve the user info from the database if exists
        const storedUser: User = await DatabaseService.getUserById(account);
        // Get the user info stored by web3 provider after login
        const web3User: UserInfo = await web3Service.api.getUserInfo('');
        // The data we currently have on this user
        const userData: User = storedUser || { ...web3User, account };
        // Add a new user If not stored in database yet
        if (!storedUser) {
            await DatabaseService.addUser(userData);
        }
        const balance: string = await tokenContract.getBalance(account);
        // Set global state user data
        dispatch(userActions.setInfo({ ...userData, balance }));
    };

    const logoutAction = async (): Promise<void> => {
        await web3Service.logout();
        dispatch(userActions.setInfo({}));
    };

    const [initialize] = useAsyncAction<void, void>(
        async () => web3Service.init(),
        {
            error: 'appInitialisationError',
            onError: () => web3Service.setInitializing(false)
        }
    );

    const [login, processing] = useAsyncAction<void, void>(loginAction, {
        error: 'loginError',
        onError: (e) =>
            e instanceof RecordNotFoundError ? 'recordNotFound' : 'loginError'
    });

    const [logout] = useAsyncAction<void, void>(logoutAction, {
        error: 'logoutError'
    });

    const [getUserData] = useAsyncAction<void, void>(setUserData, {
        error: 'loginError',
        onError: (e) =>
            e instanceof RecordNotFoundError ? 'recordNotFound' : 'loginError'
    });

    useEffect(() => {
        (async () => {
            await initialize();
            if (web3Service.isUserLoggedIn()) {
                getUserData();
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loggedIn = !!userId && web3Service.isUserLoggedIn();

    const initializing = web3Service.getInitializing();

    return { login, logout, loggedIn, initializing, processing };
};
