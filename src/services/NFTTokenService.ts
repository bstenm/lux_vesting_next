import { Contract } from 'ethers';

import NFTTokenContract from 'artifacts/contracts/LuxVestingNFT.sol/LuxVestingNFT.json';
import { NFT_TOKEN_CONTRACT_ADDRESS } from 'config/constants';

import { SmartContractService } from './SmartContractService';

class NFTTokenService extends SmartContractService {
    async debugContract(): Promise<void> {
        const contract: Contract = this.getContractWithSigner();
        const filter = contract.filters.DebugApproveParams();
        const events = await contract.queryFilter(filter);
        const event = events[events.length - 1];
        const to = event?.args?.to;
        const nftId = event?.args?.nftId;
        this.debug('Approved parameters:', to, nftId);
        this.debug('Approved parameters:', events);
    }

    async mint(recipient: string, tokenURI: string): Promise<number> {
        const contract: Contract = this.getContractWithSigner();
        this.debug('Mint nft with uri', tokenURI, 'with recipient:', recipient);
        const tx = await contract.mintNFT(recipient, tokenURI, false);
        await tx.wait();
        const filter = contract.filters.Transfer(null, recipient);
        const events = await contract.queryFilter(filter);
        const event = events[events.length - 1];
        const nftId = event?.args?.tokenId.toNumber();
        this.debug('Retrieved the nft id from the minting process:', nftId);
        return nftId;
    }

    async approve(to: string, nftId: number): Promise<void> {
        const contract: Contract = this.getContractWithSigner();
        this.debug('Approve', to, 'for manipulating nft:', nftId);
        const tx = await contract.approve(to, nftId);
        await tx.wait();
        this.debug('Approved market place', to, 'for manipulating nft:', nftId);
    }
}

export const nftTokenService = new NFTTokenService(
    NFT_TOKEN_CONTRACT_ADDRESS,
    NFTTokenContract.abi,
    'NFTToken'
);
