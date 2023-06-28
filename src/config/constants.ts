/* eslint-disable @typescript-eslint/no-non-null-assertion */

export const DEV_MODE = process.env.NODE_ENV === 'development';

export const PROD_MODE = process.env.NODE_ENV === 'production';

export const TEST_MODE = process.env.NODE_ENV === 'test';

export const SITE_TITLE = 'Lux Vesting';

export const SITE_URL = DEV_MODE
    ? 'http://localhost:3000'
    : 'https://luxvesting.com';

export const BLOCKCHAIN_CURRENCY_TO_DOLLAR = 1350;

export const DOLLAR_TO_PROPRIETARY_CURRENCY = 100;

export const EMULATOR_ON = false;

export const SHOW_RENDERED = true;

export const LOCAL_BLOCKCHAIN = false;

export const CHAIN_ID = LOCAL_BLOCKCHAIN ? 1337 : 5;

export const HOST_NETWORK = LOCAL_BLOCKCHAIN
    ? 'http://localhost:8545'
    : 'goerli';

export const NETWORK_NAME = LOCAL_BLOCKCHAIN
    ? 'Local Network'
    : 'Goerli Network';

export const OWNER_PUBLIC_KEY =
    process.env.NEXT_PUBLIC_OWNER_ACCOUNT_PUBLIC_KEY!;

export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY!;

export const MAIL_SERVICE_USER = process.env.MAIL_SERVICE_USER!;

export const TOKEN_CONTRACT_ADDRESS = LOCAL_BLOCKCHAIN
    ? process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS_ON_LOCALHOST!
    : process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS_ON_GOERLI!;

export const TOKEN_VENDOR_CONTRACT_ADDRESS = LOCAL_BLOCKCHAIN
    ? process.env.NEXT_PUBLIC_TOKEN_VENDOR_CONTRACT_ADDRESS_ON_LOCALHOST!
    : process.env.NEXT_PUBLIC_TOKEN_VENDOR_CONTRACT_ADDRESS_ON_GOERLI!;

export const NFT_TOKEN_CONTRACT_ADDRESS = LOCAL_BLOCKCHAIN
    ? process.env.NEXT_PUBLIC_NFT_TOKEN_CONTRACT_ADDRESS_ON_LOCALHOST!
    : process.env.NEXT_PUBLIC_NFT_TOKEN_CONTRACT_ADDRESS_ON_GOERLI!;

export const NFT_MARKETPLACE_CONTRACT_ADDRESS = LOCAL_BLOCKCHAIN
    ? process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS_ON_LOCALHOST!
    : process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS_ON_GOERLI!;

export const IS_TEST_NETWORK = HOST_NETWORK === 'goerli';

export const LUX_VESTING_INITIAL_BID_RATIO =
    DEV_MODE || IS_TEST_NETWORK ? 1 / 1000 : 25 / 100;
