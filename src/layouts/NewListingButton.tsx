import Link from 'next/link';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { Row } from 'components/Row';
import { Typography } from 'components/Typography';
import { merchantAssets } from 'pages/MerchantAssetsPage';

export function NewListingButton(): JSX.Element {
    return (
        <Link href={`${merchantAssets.path}/addNewAsset`}>
            <Row
                spacing={0.8}
                sx={{
                    color: 'success.main'
                }}>
                <AddCircleIcon />
                <Typography
                    sx={{
                        color: 'inherit'
                    }}
                    textId="newListing"
                    allCapitalized
                />
            </Row>
        </Link>
    );
}
