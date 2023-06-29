'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import ChevronRight from '@mui/icons-material/ExpandMore';

import { Row } from '@/components/Row';
import { Badge } from '@/components/Badge';
import { IconButton } from '@/components/iconButtons/IconButton';
import { FilterIconButton } from '@/components/iconButtons/FilterIconButton';

type Props = {
    children: React.ReactNode;
    onToggle: (isOpen: boolean) => void;
};

export function AdvancedFiltersPanel({
    children,
    onToggle
}: Props): JSX.Element {
    const [isOpen, setOpen] = useState<boolean>(false);

    const togglePanel = (): void => {
        setOpen(!isOpen);
        setTimeout(() => onToggle(!isOpen), isOpen ? 300 : 0);
    };

    return (
        <Row
            sx={{
                top: 150,
                right: isOpen ? 20 : -285,
                position: 'fixed',
                transition: 'all 0.3s ease'
            }}>
            <Box
                sx={{
                    top: isOpen ? 35 : 65,
                    left: isOpen ? 0 : 45,
                    height: 30,
                    position: 'relative',
                    transform: 'rotate(-90deg)'
                }}>
                {isOpen ? (
                    <IconButton
                        sx={{
                            p: 0.5,
                            color: 'text.secondary',
                            bgcolor: '#151515',
                            borderRadius: 1,
                            '&:hover': {
                                bgcolor: '#151515',
                                color: 'common.white'
                            }
                        }}
                        onClick={togglePanel}>
                        <ChevronRight fontSize="large" />
                    </IconButton>
                ) : (
                    <Badge color="error" badgeContent={0}>
                        <FilterIconButton
                            onClick={togglePanel}
                            sx={{
                                p: 2,
                                pb: 4,
                                color: 'text.disabled',
                                bgcolor: '#151515',
                                borderRadius: 1,
                                '&:hover': {
                                    bgcolor: '#151515',
                                    color: 'common.white'
                                }
                            }}
                        />
                    </Badge>
                )}
            </Box>
            <Stack
                sx={{ p: 4, width: 280, bgcolor: '#151515', zIndex: 10 }}
                spacing={4}>
                {children}
            </Stack>
        </Row>
    );
}
