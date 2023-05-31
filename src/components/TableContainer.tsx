'use client';

import { styled } from '@mui/material/styles';
import MuiTableContainer from '@mui/material/TableContainer';

export const TableContainer = styled(MuiTableContainer)<{ height?: string }>`
    width: calc(100vw - 130px);
    height: ${(props) => props.height ?? 'calc(100vh - 140px)'};
    background: linear-gradient(180deg, #3c4858 0%, #151516 58.85%);
`;
