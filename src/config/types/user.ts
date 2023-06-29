import { NotificationData, Tier } from '@/config/types';
import { userTypes } from '@/config';

import { AssetItem } from './asset';

export type UserType = (typeof userTypes)[number];

export type User = {
    email: string;
    account: string;
    name?: string;
    avatar?: string;
    verifier?: string;
    balance?: string;
    jobTitle?: string;
    verifierId?: string;
    company?: string;
    userType?: UserType;
    lastName?: string;
    createdAt?: string;
    firstName?: string;
    description?: string;
    favorites?: string[];
    notifications?: NotificationData[];
    profileImage?: string;
    paymentAccount?: string;
    assets?: AssetItem[];
    isAdmin?: boolean;
    address?: string;
};

export type EditProfileFormInput = {
    email: string;
    company: string;
    userType: UserType;
    lastName: string;
    firstName: string;
    description: string;
    paymentAccount: string;
};

export type EditProfileFormInputWithAvatar = EditProfileFormInput & {
    avatarFile: File;
};

export type UserFunds = {
    tier: Tier;
    return?: number;
    balance: number;
    lastMonthReturn?: number;
};

export type UserActivities = 'addFund' | 'addAsset';

export type UserHistoricalActivity = {
    title: UserActivities;
    item?: string;
    amount?: number;
};

export type UserHistoricalActivityItem = UserHistoricalActivity & {
    id: string;
    createdAt: string;
};

export type UserLimitOrder = {
    item: string;
    min?: number;
    max?: number;
    tradePrice: number;
};

export type UserLimitOrderItem = UserLimitOrder & {
    id: string;
};
