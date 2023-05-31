import NFTMarketplaceContract from 'artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';
import { convertToBlockchainCurrencyUnit } from 'libs/utils';
import { NFT_MARKETPLACE_CONTRACT_ADDRESS } from 'config/constants';

import { Contract } from 'ethers';
import { SmartContractService } from './SmartContractService';

export type CreateListingParams = {
    price: number;
    nftId: number;
    value: number;
    recipient: string;
};

export class NFTMarketplaceService extends SmartContractService {
    async debugContract(): Promise<void> {
        const contract: Contract = this.getContractWithSigner();
        const filter = contract.filters.DebugTestMeParams();
        const events = await contract.queryFilter(filter);
        const event = events[events.length - 1];
        const nftId = event?.args?.nftId;
        const to = event?.args?.to;
        const thisAdress = event?.args?.thisAdress;
        const nftContractAddress = event?.args?.nftContractAddress;
        const approved = event?.args?.approved;
        this.debug(
            'Parameters:',
            nftId,
            to,
            thisAdress,
            nftContractAddress,
            approved
        );
        this.debug('Approved parameters:', events);
    }

    testMe = async (nftId: number, to: string): Promise<void> => {
        const contract = this.getContractWithSigner();
        this.debug('Test fn with:', nftId, 'and:', to);
        await contract.testMe(nftId, to);
    };

    createListing = async (params: CreateListingParams): Promise<void> => {
        const contract = this.getContractWithSigner();
        const { recipient: to, nftId } = params;
        const { price: priceInFiat, value: valueInFIat } = params;
        const price = convertToBlockchainCurrencyUnit(priceInFiat);
        const value = convertToBlockchainCurrencyUnit(valueInFIat);
        this.debug('Create listing for nft:', nftId, 'to account:', to);
        const tx = await contract.createListing(nftId, price, to, { value });
        await tx.wait();
        this.debug('Added item to marketplace:', { to, nftId, price, value });
    };
}

export const nftMarketplaceService = new NFTMarketplaceService(
    NFT_MARKETPLACE_CONTRACT_ADDRESS,
    NFTMarketplaceContract.abi,
    'NFTMarketplace'
);
