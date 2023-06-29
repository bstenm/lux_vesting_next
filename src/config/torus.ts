/* eslint-disable max-len */
import { TorusParams, TORUS_BUILD_ENV_TYPE } from '@toruslabs/torus-embed';

import { CHAIN_ID, HOST_NETWORK, NETWORK_NAME } from '@/config/constants';

export const buildEnv = 'testing' as TORUS_BUILD_ENV_TYPE;

export const whiteLabelData = {
    theme: {
        isDark: false,
        colors: {
            torusBrand1: '#282c34'
        }
    },
    logoDark: 'https://tkey.surge.sh/images/Device.svg',
    logoLight: 'https://tkey.surge.sh/images/Device.svg',
    topupHide: false,
    featuredBillboardHide: true,
    disclaimerHide: true,
    defaultLanguage: 'en',
    tncLink: {
        en: 'http://example.com/tnc/en',
        ja: 'http://example.com/tnc/ja'
    },
    privacyPolicy: {
        en: 'http://example.com/tnc/en',
        ja: 'http://example.com/tnc/ja'
    },
    contactLink: {
        en: 'http://example.com/tnc/en',
        ja: 'http://example.com/tnc/ja'
    },
    // TODO: translations
    customTranslations: {
        en: {
            login: {
                acceptTerms: 'By logging in, you accept Examples',
                your: 'Your',
                digitalWallet: 'digital wallet instantly',
                buttonText: 'Login with Startrail'
            },
            dappTransfer: {
                data: 'Data to sign'
            },
            dappPermission: {
                permission: 'Permission',
                requestFrom: 'Request from',
                accessUserInfo:
                    'To access your Google Email Address, Profile Picture and Name'
            }
        },
        ja: {
            login: {
                acceptTerms: 'ログインすると、Examples を受け入れます',
                your: '君の',
                digitalWallet: 'すぐにデジタルウォレット',
                buttonText: 'Startrailでログイン'
            },
            dappTransfer: {
                data: 'あなたがサインするデータ'
            },
            dappPermission: {
                permission: '下記の内容を許可しますか',
                requestFrom: '許可を求めているアプリケーション',
                accessUserInfo:
                    '受け取る情報: Googleメール、プロフィール写真、名前'
            }
        }
    }
};

export const torusConfig: TorusParams = {
    buildEnv,
    enabledVerifiers: {},
    enableLogging: true,
    network: {
        host: HOST_NETWORK,
        chainId: CHAIN_ID,
        networkName: NETWORK_NAME
    },
    showTorusButton: false,
    integrity: {
        version: '1.11.0',
        check: false
    },
    whiteLabel: whiteLabelData,
    skipTKey: true
};
