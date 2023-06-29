'use client';

import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import ConstructionIcon from '@mui/icons-material/Construction';

import { useTranslate } from '@/libs/hooks/useTranslate';

const Container = styled('div')(({ theme }) => ({
    color: theme.palette.primary.dark,
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

function UnderConstructionPage(): JSX.Element {
    const t = useTranslate();

    return (
        <Container>
            <Tooltip title={t('underConstruction') ?? ''}>
                <ConstructionIcon
                    sx={{ color: 'primary.light', fontSize: 120 }}
                />
            </Tooltip>
        </Container>
    );
}

export default UnderConstructionPage;
