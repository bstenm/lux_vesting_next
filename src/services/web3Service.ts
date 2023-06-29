import Torus, {
    WALLET_PATH,
    TorusInpageProvider
} from '@toruslabs/torus-embed';

import { logger } from '@/libs/logger';
import { torusConfig } from '@/config/torus';

const log = logger('Web3 Service');

class Web3Service {
    public api: Torus;

    private initializing: boolean;

    constructor() {
        this.api = new Torus();
        this.initializing = false;
    }

    async init(): Promise<void> {
        if (this.api.isInitialized || this.initializing) return;
        this.initializing = true;
        log.debug('Initialisation');
        await this.api.init(torusConfig);
        this.initializing = false;
        log.debug('successfully initialised');
    }

    setInitializing(state: boolean): void {
        this.initializing = state;
    }

    getInitializing(): boolean {
        return this.initializing;
    }

    getProvider(): TorusInpageProvider {
        return this.api.provider;
    }

    async login(): Promise<string> {
        const [account] = await this.api.login();
        return account;
    }

    async logout(): Promise<void> {
        await this.api.logout();
    }

    isReady(): boolean {
        return this.api.isInitialized;
    }

    showWallet(type: WALLET_PATH): void {
        this.api.showWallet(type);
    }

    isUserLoggedIn(): boolean {
        return this.api.isLoggedIn;
    }
}

export const web3Service = new Web3Service();
