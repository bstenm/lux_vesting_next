'use client';

import { HookOptions } from 'config/types';
import { nftTokenService } from 'services/NFTTokenService';

import { useAsyncAction } from '../../../libs/hooks/useAsyncAction';

type MintParams = {
    recipient: string;
    tokenURI: string;
};

type ApproveParams = {
    to: string;
    nftId: number;
};

type StateLogic = {
    minting: boolean;
    approving: boolean;
    mintNFT: (params: MintParams) => Promise<number>;
    approveAddress: (params: ApproveParams) => Promise<void>;
};

export const useNFTTokenService = (op: HookOptions = {}): StateLogic => {
    const mint = async ({
        recipient,
        tokenURI
    }: MintParams): Promise<number> => {
        return nftTokenService.mint(recipient, tokenURI);
    };

    const [mintNFT, minting] = useAsyncAction<MintParams, number>(mint, {
        info: 'mintingProcessLaunched',
        error: 'errorMintingAssetNFT',
        success: 'successMintingAssetNFT',
        ...op
    });

    const approveAction = async ({ to, nftId }: ApproveParams): Promise<void> =>
        nftTokenService.approve(to, nftId);

    const [approveAddress, approving] = useAsyncAction<ApproveParams, void>(
        approveAction,
        {
            error: 'errorApprovingContract',
            ...op
        }
    );

    return {
        minting,
        approving,
        mintNFT,
        approveAddress
    };
};
