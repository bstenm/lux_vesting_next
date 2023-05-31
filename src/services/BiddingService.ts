import {
    convertToBlockchainCurrencyUnit,
    convertFromBlockchainCurrencyUnit
} from 'libs/utils';
import BiddingContract from 'artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';
import { Bid, BidRecord } from 'config/types';
import { NFT_MARKETPLACE_CONTRACT_ADDRESS } from 'config/constants';

import { SmartContractService } from './SmartContractService';

export class BiddingService extends SmartContractService {
    getItemBids = async (nftId: number): Promise<Bid[]> => {
        const contract = this.getContractWithProvider();
        this.debug('Attempt to retrieve bids recorded for nft:', nftId);
        const [bids] = await contract.getBidData(nftId);
        this.debug('Retrieved bids recorded for nft:', nftId, ':', bids);
        return bids.reduce((acc: Bid[], bid: BidRecord): Bid[] => {
            if (!bid.value) return acc;
            const value = convertFromBlockchainCurrencyUnit(bid.value);
            acc.push({ bidder: bid.bidder, nftId, value });
            return acc;
        }, []);
    };

    createBid = async (bid: Bid): Promise<void> => {
        const contract = this.getContractWithSigner();
        const { value: valueInFiat, bidder, nftId } = bid;
        this.debug('Record bid for nft:', nftId, 'with value:', valueInFiat);
        const value = convertToBlockchainCurrencyUnit(valueInFiat);
        // !!The user eth account is their user id!!
        const tx = await contract.createBid(nftId, bidder, { value });
        await tx.wait();
    };

    endAuction = async (nftId: number): Promise<void> => {
        const contract = this.getContractWithSigner();
        this.debug('End auction for nft id: ', nftId);
        const tx = await contract.endAuction(nftId);
        await tx.wait();
    };
}

export const biddingService = new BiddingService(
    NFT_MARKETPLACE_CONTRACT_ADDRESS,
    BiddingContract.abi,
    'Bidding'
);
