'use client';

import { useAsyncAction } from '@/libs/hooks/useAsyncAction';
// import { useAppSelector } from 'hooks/useAppSelector';
// import { getUserAccount } from '@/state/user/selectors';
// import { useNFTTokenService } from 'hooks/useNFTTokenService';
// import { getItemCoverPicture } from '@/libs/utils';
// import { useUpdateAssetData } from '@/libs/hooks/useUpdateAssetData';
import { useUpdateAssetStatus } from '@/libs/hooks/useUpdateAssetStatus';
// import { useCreateMarketplaceItem } from 'hooks/useCreateMarketplaceItem';
// import { useUploadAssetMediaToIPFS } from 'hooks/useUploadAssetMediaToIPFS';
import { AssetItem } from '@/config/types/asset';
// import {
//     LUX_VESTING_INITIAL_BID_RATIO,
//     NFT_MARKETPLACE_CONTRACT_ADDRESS
// } from '@/config/constants';

type HookLogic = [() => void, boolean];

export const useApproveAssetListing = (
    data: AssetItem,
    onSuccess: () => void
): HookLogic => {
    // const broker = useAppSelector(getUserAccount);

    // const coverPhotoData = getItemCoverPicture(data);

    // All actions should throw so the listing process aborts on first error
    const throws = true;

    // const [updateAssetData] = useUpdateAssetData(data.id, { throws });

    const [updateAssetListingStatus] = useUpdateAssetStatus(
        data.id,
        data.merchantId,
        'listing',
        { throws }
    );

    // const [uploadMediaToIPFS] = useUploadAssetMediaToIPFS({ throws });

    // const [createMarketplaceItem] = useCreateMarketplaceItem({ throws });

    // const { mintNFT, approveAddress } = useNFTTokenService({ throws });

    const onApproveListing = async (): Promise<void> => {
        await updateAssetListingStatus('approved');
        onSuccess();
        // if (!coverPhotoData) return;
        // const { price } = data;
        // const listing: AssetStatusDetails = {status: 'approved'};
        // const { uri, name, type } = coverPhotoData;
        // const tokenURI = await uploadMediaToIPFS({ uri, name, type });
        // const nftId = await mintNFT({ recipient: data.merchantId, tokenURI });
        // await approveAddress({ to: NFT_MARKETPLACE_CONTRACT_ADDRESS, nftId });
        // const value = LUX_VESTING_INITIAL_BID_RATIO * price;
        // await createMarketplaceItem({ recipient: broker, nftId, price, value });
        // await updateAssetData({ listingStatus, nftId, tokenURI });
    };

    const [onApprove, approving] = useAsyncAction<void, void>(
        onApproveListing,
        { error: 'listingAssetError' }
    );

    return [onApprove, approving];
};
