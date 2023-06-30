import { formatUnits } from 'ethers';

import TokenContract from '@/artifacts/contracts/LuxVestingToken.sol/LuxVestingToken.json';
import { TOKEN_CONTRACT_ADDRESS } from '@/config/constants';

import { SmartContractService } from './SmartContractService';

export class TokenService extends SmartContractService {
    async getBalance(account: string): Promise<string> {
        const balance = await this.getContractWithProvider().balanceOf(account);
        const parsedBalance = formatUnits(balance);
        this.log.debug('get balance:', parsedBalance);
        return parsedBalance;
    }
}

export const tokenContract = new TokenService(
    TOKEN_CONTRACT_ADDRESS,
    TokenContract.abi,
    'Token'
);
