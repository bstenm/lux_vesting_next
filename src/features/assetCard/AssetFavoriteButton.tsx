'use client';

import Box from '@mui/material/Box';
import { grey, purple } from '@mui/material/colors';
import { remove } from 'lodash';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import { Spinner } from '@/components/Spinner';
import { getUserId } from '@/state/user/selectors';
import { RootState } from '@/redux/store';
import { IconButton } from '@/components/iconButtons/IconButton';
import { useAppSelector } from '@/libs/hooks/useAppSelector';
import { getAssetFollowers } from '@/state/assets/selectors';
import { useUpdateAssetData } from '@/libs/hooks/useUpdateAssetData';

type Props = React.ComponentProps<typeof IconButton> & {
    assetId: string;
};

export function AssetFavoriteButton({ assetId, ...props }: Props): JSX.Element {
    const uid = useAppSelector(getUserId);

    const followers = useAppSelector((state: RootState) =>
        getAssetFollowers(state, assetId)
    );

    const [updateAssetData, processing] = useUpdateAssetData(assetId);

    const setAsFavorite = (): void => {
        const clone = [...followers];
        if (clone.includes(uid)) {
            remove(clone, (e) => e === uid);
        } else {
            clone.push(uid);
        }
        updateAssetData({ followers: clone });
    };

    if (processing) {
        return (
            <Box sx={{ p: 2 }}>
                <Spinner size={14} />
            </Box>
        );
    }

    const isFollowing = followers.includes(uid);

    return (
        <IconButton
            title={isFollowing ? 'following' : 'follow'}
            onClick={setAsFavorite}
            {...props}>
            {isFollowing ? (
                <BookmarkIcon sx={{ fontSize: 30, color: purple[300] }} />
            ) : (
                <BookmarkIcon
                    sx={{
                        color: grey[800],
                        fontSize: 30
                    }}
                />
            )}
        </IconButton>
    );
}
