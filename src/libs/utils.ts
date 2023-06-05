import sortBy from 'lodash/sortBy';
import { BigNumberish, formatUnits, formatEther, parseEther } from 'ethers';

import {
    AssetItem,
    MimeType,
    AssetMediaMetadata,
    AssetMediaMetadataItem
} from 'config/types/asset';
import { allowedFileMimes } from 'config';
import { BLOCKCHAIN_CURRENCY_TO_DOLLAR } from 'config/constants';

export const formatCryptoPriceForDisplay = (
    tokenPrice: BigNumberish
): number => {
    const priceAsStr: string = formatUnits(tokenPrice.toString(), 'ether');
    return parseFloat(priceAsStr);
};

export const isValidDocumentFileType = (file: File): boolean =>
    !file ||
    Object.keys(allowedFileMimes.document).includes(file.type as MimeType);

export const isValidPictureFileType = (file: File): boolean =>
    !file ||
    Object.keys(allowedFileMimes.picture).includes(file.type as MimeType);

// The title of the file is the file name without the extension
// TODO: Better way to extract file title?
export const getFileTitle = (file: File): string =>
    file.name.split('.').shift() ?? file.name;

export const getItemPics = (data: AssetItem): AssetMediaMetadataItem[] =>
    data.medias.filter((e) => e.type === 'picture');

export const getCertificateOfAuthenticity = (
    data: AssetItem
): string | undefined =>
    data?.medias.find(
        (e: AssetMediaMetadata) => e.type === 'document' && e.priority === 1
    )?.uri;

export const getItemPictures = (item: AssetItem): AssetMediaMetadata[] =>
    sortBy(
        item.medias.filter((e: AssetMediaMetadata) => e.type === 'picture') ||
            [],
        'priority'
    );

export const getItemCoverPicture = (
    item: AssetItem
): AssetMediaMetadata | undefined =>
    item.medias.find(
        (e: AssetMediaMetadata) => e.type === 'picture' && e.priority === 1
    );

export const withEllipsis = (s: string, maxLen: number): string =>
    s.length > maxLen ? `${s.substring(0, maxLen)}...` : s;

export const convertFromBlockchainCurrencyUnit = (
    unit: BigNumberish
): number => {
    const valueInEth = formatEther(unit);
    const amountInEth = parseFloat(valueInEth);
    const amountInFiat = amountInEth * BLOCKCHAIN_CURRENCY_TO_DOLLAR;
    return parseFloat(amountInFiat.toFixed(2));
};

export const convertToBlockchainCurrencyUnit = (
    amount: number
): BigNumberish => {
    const amountInBlockchainCurrency = amount / BLOCKCHAIN_CURRENCY_TO_DOLLAR;
    return parseEther(amountInBlockchainCurrency.toFixed(17).toString());
};

export const formatDate = (date: string | number): string =>
    new Date(date).toLocaleDateString();
