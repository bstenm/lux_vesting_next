import { Contract, InterfaceAbi, BrowserProvider } from 'ethers';

import { Logger, logger } from '@/libs/logger';
import { HOST_NETWORK } from '@/config/constants';
import { MissingContractAddressError } from '@/libs/customErrors';

import { web3Service } from './web3Service';

export class SmartContractService {
    public abi: InterfaceAbi;

    public log: Logger;

    public debug: (...args: unknown[]) => void;

    public ctName: string;

    public ctAddress: string;

    private provider!: BrowserProvider;

    private ctWithSigner!: Contract;

    private ctWithProvider!: Contract;

    constructor(
        contractAddress: string,
        contractAbi: InterfaceAbi,
        contractName: string
    ) {
        if (!contractAddress) {
            throw new MissingContractAddressError(contractName);
        }
        this.abi = contractAbi;
        this.log = logger(`${contractName} Contract`);
        this.debug = this.log.debug;
        this.ctName = contractName;
        this.ctAddress = contractAddress;
        this.debug('Contract address:', contractAddress);
    }

    getProvider = (): BrowserProvider => {
        if (!this.provider) {
            const web3Provider = web3Service.getProvider();
            this.provider = new BrowserProvider(web3Provider);
        }
        return this.provider;
    };

    getContractWithProvider = (): Contract => {
        if (this.ctWithProvider) return this.ctWithProvider;
        const provider = this.getProvider();
        this.ctWithProvider = new Contract(this.ctAddress, this.abi, provider);
        this.debug(`Got a  contract instance with provider`);
        return this.ctWithProvider;
    };

    getContractWithSigner = async (): Promise<Contract> => {
        if (this.ctWithSigner) return this.ctWithSigner;
        this.debug('Get signer for', this.ctAddress, 'on: ', HOST_NETWORK);
        const signer = await this.getProvider().getSigner();
        this.ctWithSigner = new Contract(this.ctAddress, this.abi, signer);
        this.debug('Got a contract instance with signer for', this.ctAddress);
        return this.ctWithSigner;
    };
}
