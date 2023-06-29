import pick from 'lodash/pick';

import { RootState } from '@/redux/store';
import { AssetItem } from '@/config/types/asset';
import { User, UserFunds, UserLimitOrderItem } from '@/config/types/user';

export const isUserLoggedIn = (state: RootState): boolean =>
    !!state.user.account;

// We use user ethereum account as user id
export const getUserId = (state: RootState): string => state.user.account;

export const getUserName = (state: RootState): string => state.user.name;

export const isUserAdmin = (state: RootState): boolean => state.user.isAdmin;

export const isUserBuilder = (state: RootState): boolean =>
    state.user.isBuilder;

export const getUserData = (state: RootState): User => state.user;

export const getUserBalance = (state: RootState): number =>
    parseInt(state.user.balance ?? 0, 10);

export const getUserAccount = (state: RootState): string => state.user.account;

export const getUserProfileData = (state: RootState): Partial<User> =>
    pick(state.user, [
        'avatar',
        'company',
        'userType',
        'lastName',
        'firstName',
        'description',
        'profileImage',
        'paymentAccount'
    ]);

export const getUserAssetsData = (state: RootState): AssetItem[] =>
    state.user.assets;

export const getUserFundData = (state: RootState): UserFunds => ({
    balance: getUserBalance(state),
    tier: 'silver'
});

export const getUserLimitOrdersData = (): UserLimitOrderItem[] => [
    {
        id: '1',
        item: 'hermes h08 graphene composite',
        tradePrice: 67,
        max: 250
    },
    {
        id: '2',
        item: 'hermes h08 graphene composite',
        tradePrice: 124,
        min: 80
    }
];
