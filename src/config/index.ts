import { MediaType, MimeType } from './types/asset';

export const siteTitle = 'LuxVesting';

export const siteDescription =
    'Premium asset backed blockchain investment platform';

export const allowedFileMimes: Record<MediaType, Record<MimeType, string[]>> = {
    picture: {
        'image/png': ['.png'],
        'image/jpg': ['.jpg', '.jpeg'],
        'image/jpeg': ['.jpg', '.jpeg'],
        'application/pdf': []
    },
    document: {
        'image/png': ['.png'],
        'image/jpg': ['.jpg', '.jpeg'],
        'image/jpeg': ['.jpg', '.jpeg'],
        'application/pdf': ['.pdf']
    }
};

export const fileMaxSize = {
    // in kb
    picture: 500 * 1000,
    document: 500 * 1000
};

export const avatarsStoragePath = 'avatars';

export const mediaStoragePath = 'medias';

export const userTypes = ['customer', 'vendor', 'admin'] as const;

export const languages = ['en', 'zh', 'es'];

export const defaultLng = languages[0];

export const defaultCurrency = 'USD';

export const defaultCurrencySymbol = '$';

export const cryptoCurrency = 'ETH';

export const proprietaryCurrency = 'LVX';

export const minBidValueAllowed = 10;

export const chartRanges: string[] = [
    '1Day',
    '1Week',
    '1Month',
    '3Months',
    '1Year'
];

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const adminID = process.env.NEXT_PUBLIC_ADMIN_ID!;
