import { AssetListingStatus, AssetAuthenticationStatus } from './asset';

export type Required<T> = {
    [P in keyof T]-?: T[P];
};

export type BooleanPropertyNames<T> = {
    [K in keyof Required<T>]: Required<T>[K] extends boolean ? K : never;
}[keyof Required<T>];

export type ContactFormInput = {
    email: string;
    message: string;
    lastName: string;
    firstName: string;
};

export type Tier = 'silver' | 'gold' | 'platinum';

export type Message = {
    to: string;
    text: string;
    from: string;
};

export type MessageItem = Message & {
    id: string;
    createdAt: string;
};

export type IPFSMedia = {
    uri: string;
    type: string;
    name: string;
};

export type HookOptions = {
    info?: string;
    error?: string;
    silent?: boolean;
    throws?: boolean;
    success?: string;
    onError?: (e?: unknown) => void;
    onSuccess?: () => void;
};

export type NotificationType =
    | 'newMessage'
    | 'newBidPlaced'
    | 'listingStatusChanged'
    | 'authenticationStatusChanged';

export type BaseNotificationData = {
    link?: string;
    type: NotificationType;
    assetId: string;
};

export type NewBidNotificationData = BaseNotificationData & {
    from: string;
    value: number;
};

export type NewMessageNotificationData = BaseNotificationData & {
    from: string;
};

export type StatusChangeNotificationData = BaseNotificationData & {
    value: AssetListingStatus | AssetAuthenticationStatus;
};

export type NotificationData =
    | NewBidNotificationData
    | NewMessageNotificationData
    | StatusChangeNotificationData;

export type NotificationItem = NotificationData & {
    id: string;
    createdAt: string;
};

export type SelectInputValue = {
    id: string;
    type: 'singleValue';
    value: string | null;
    name: string;
    selected: boolean;
};

export type SelectInputMultiValue = {
    id: string;
    type: 'multiValues';
    value: (string | null)[];
    name: string;
    selected: boolean;
};

export type SelectInputRange = {
    id: string;
    type: 'range';
    value: number[];
    name: string;
    selected: boolean;
};

export type SelectFilterEntry =
    | SelectInputValue
    | SelectInputMultiValue
    | SelectInputRange;
