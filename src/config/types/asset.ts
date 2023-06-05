import { BigNumberish } from 'ethers';

export type BidRecord = {
    value: BigNumberish;
    bidder: string;
    recipient: string;
};

export type Bid = {
    value: number;
    bidder: string;
};

export type BidItem = Bid & {
    id: string;
    createdAt: string;
};

export type AssetCategory = 'watch';

export type MediaType = 'picture' | 'document';

export type MimeType =
    | 'image/jpg'
    | 'image/jpeg'
    | 'image/png'
    | 'application/pdf';

export type AssetStatusType = 'listing' | 'authentication';

export type AssetAuthenticationStatus =
    | 'unprocessed'
    | 'approved'
    | 'revoked'
    | 'pending'
    | 'denied';

export type AssetListingStatus =
    | 'denied'
    | 'pending'
    | 'revoked'
    | 'approved'
    | 'unprocessed';

export type Asset = {
    color: string;
    price: number;
    name: string;
    medias: AssetMediaMetadataItem[];
    material: string;
    category: AssetCategory;
    tokenURI: string;
    description: string;
    merchantId: string;
    wristLength: number;
    merchantName: string;
};

export type AssetListingData = {
    bids?: Bid[];
    notes?: string;
    status: AssetListingStatus;
    updatedAt: number;
    nbOfTimesSaved?: number;
    nbOfTimesViewed?: number;
};

export type AssetAuthenticationStatusData = {
    notes?: string;
    status: AssetAuthenticationStatus;
    updatedAt?: number;
};

export type AssetItem = Asset & {
    id: string;
    listing?: AssetListingData;
    createdAt: string;
    followers?: string[];
    authentication: AssetAuthenticationStatusData;
    physicallyChecked?: boolean;
    physicallyReceived?: boolean;
    physicallyCheckedAt?: number;
    physicallyReceivedAt?: string;
    documentationChecked?: boolean;
};

export type NewAsset = Pick<
    AssetItem,
    'name' | 'category' | 'merchantId' | 'merchantName'
>;

export type AssetMedia = {
    file: File;
    title: string;
    name: string;
    type: MediaType;
    priority?: number;
};

export type AssetMediaItem = AssetMedia & {
    id: string;
    createdAt: string;
};

export type AssetMediaMetadata = Omit<AssetMedia, 'file'> & {
    uri: string;
};

export type AssetMediaMetadataItem = AssetMediaMetadata & {
    id: string;
};

export type AddFileFormInput = Omit<AssetMedia, 'type'>;

export type TradedItem = AssetItem & {
    salesPrice?: number;
    equityOwned?: number;
    expectedReturn?: number;
};

export type UserAssetItem = Asset & {
    id: string;
    shares: number;
    assetId: string;
    createdAt: string;
};

export type AddNewAssetFormInput = {
    name: string;
    picture: File;
};

export type AssetListingFormInput = {
    price: number;
    color: string;
    material: string;
    description: string;
    wristLength: number;
};

export type EditAssetDataFormInput = {
    price: number;
    color: string;
    name: string;
    material: string;
    description: string;
    wristLength: number;
};

export type AssetAuthenticationFormInput = {
    address: string;
    certificateOfAuthenticityFile: File;
};
