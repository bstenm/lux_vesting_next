import AddCircleIcon from '@mui/icons-material/AddCircle';

import { Row } from '@/components/Row';
import { Typography } from '@/components/Typography';
import { IconButton } from '@/components/iconButtons/IconButton';

type Props = {
    onClick: () => void;
};

export function NewListingButton({ onClick }: Props): JSX.Element {
    return (
        <IconButton onClick={onClick}>
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
        </IconButton>
    );
}
