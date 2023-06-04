import { parseUnits } from 'ethers';

import TokenVendor from 'artifacts/contracts/LuxVestingTokenVendor.sol/LuxVestingTokenVendor.json';
import { TOKEN_VENDOR_CONTRACT_ADDRESS } from 'config/constants';

import { SmartContractService } from 'services/SmartContractService';

export class TokenVendorContractService extends SmartContractService {
    async releaseTokens(to: string, value: number): Promise<void> {
        this.debug('Token transfer initiated: to', to, 'with value', value);
        const signedContract = await this.getContractWithSigner();
        const parsedValue = parseUnits(value.toString());
        const transaction = await signedContract.releaseTokens(to, parsedValue);
        this.debug('Token transfer pending');
        await transaction.wait();
        this.debug('Token transfer completed:: to', to, 'with value', value);
    }

    async retrieveTokens(from: string, value: number): Promise<void> {
        this.debug('Transaction initiated: from', from, 'with value', value);
        const signedContract = await this.getContractWithSigner();
        const parsedValue = parseUnits(value.toString());
        const tx = await signedContract.retrieveTokens(from, parsedValue);
        this.debug('Transaction pending');
        await tx.wait();
        this.debug('Transfer completed:: from', from, 'with value', value);
    }
}

export const tokenVendorContract = new TokenVendorContractService(
    TOKEN_VENDOR_CONTRACT_ADDRESS,
    TokenVendor.abi,
    'TokenVendor'
);
