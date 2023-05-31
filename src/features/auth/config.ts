'use client';

import { TorusWalletOptions } from '@web3auth/torus-evm-adapter';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { Web3AuthNoModalOptions } from '@web3auth/no-modal';

export const web3authConfig: Web3AuthNoModalOptions = {
    clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!,
    web3AuthNetwork: 'testnet',
    chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: '0x5'
    }
};

export const torusWalletAdapterSettings: TorusWalletOptions = {
    initParams: {
        whiteLabel: {
            theme: {
                isDark: true,
                colors: { torusBrand1: '#FFA500' }
            },
            logoDark: 'https://images.web3auth.io/web3auth-logo-w.svg',
            logoLight: 'https://images.web3auth.io/web3auth-logo-w-light.svg',
            topupHide: true,
            featuredBillboardHide: true,
            disclaimerHide: true,
            defaultLanguage: 'en'
        }
    }
};

// TODO: remove
// export const openLoginAdapterSettings: OpenloginAdapterOptions = {
//     adapterSettings: {
//         uxMode: 'redirect',
//         loginConfig: {
//             jwt: {
//                 name: 'app-jwt',
//                 verifier: process.env.NEXT_PUBLIC_WEB3AUTH_VERIFIER_NAME!,
//                 typeOfLogin: 'jwt',
//                 clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!
//             }
//         }
//     }
// };
