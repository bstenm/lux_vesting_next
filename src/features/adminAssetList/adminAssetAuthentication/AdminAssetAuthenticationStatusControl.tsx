'use client';

import Box from '@mui/material/Box';
import Stack, { StackProps } from '@mui/material/Stack';

import { AssetItem } from 'config/types/asset';

import { AssetDocumentList } from './AssetDocumentList';
import { AdminAssetAuthenticationFormCheckbox } from './AdminAssetAuthenticationFormCheckbox';
import { AdminAssetAuthenticationStatusControlButtons } from './AdminAssetAuthenticationStatusControlButtons';

type Props = StackProps & {
    data: AssetItem;
    handleClose: () => void;
};

export function AdminAssetAuthenticationStatusControl({
    data,
    handleClose,
    ...other
}: Props): JSX.Element {
    return (
        <Stack spacing={2} {...other}>
            <Box sx={{ py: 2 }}>
                <AssetDocumentList
                    documents={data.medias.filter((e) => e.type === 'document')}
                />
            </Box>
            <Stack sx={{ pb: 3 }}>
                <AdminAssetAuthenticationFormCheckbox
                    value={data.physicallyReceived}
                    assetId={data.id}
                    property="physicallyReceived"
                />
                <AdminAssetAuthenticationFormCheckbox
                    value={data.physicallyChecked}
                    assetId={data.id}
                    property="physicallyChecked"
                />
                <AdminAssetAuthenticationFormCheckbox
                    value={data.documentationChecked}
                    assetId={data.id}
                    property="documentationChecked"
                />
            </Stack>
            <AdminAssetAuthenticationStatusControlButtons
                data={data}
                handleClose={handleClose}
            />
        </Stack>
    );
}
