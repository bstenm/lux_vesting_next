import Link from 'next/link';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { Row } from 'components/Row';
import { Typography } from 'components/Typography';
import { path } from 'config/path';

export function NewListingButton(): JSX.Element {
    return (
        <Link href={`${path.merchantAssets}/addNewAsset`}>
            <Row
                spacing={0.8}
                alignItems="center"
                sx={{
                    color: 'success.main'
                }}>
                <AddCircleIcon />
                <Typography
                    sx={{
                        color: 'inherit'
                    }}
                    textId="newListing"
                    variant="body2"
                    allCapitalized
                />
            </Row>
        </Link>
    );
}
