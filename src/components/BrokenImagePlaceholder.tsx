'use client';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import { grey } from '@mui/material/colors';

const Container = styled(Box)({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    background: '#eee',
    borderRadius: '5px',
    justifyContent: 'center'
});

export function BrokenImagePlaceholder(): JSX.Element {
    return (
        <Container>
            <BrokenImageOutlinedIcon
                sx={{ color: grey[600] }}
                fontSize="large"
            />
        </Container>
    );
}
