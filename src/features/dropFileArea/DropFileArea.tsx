'use client';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import GetAppIcon from '@mui/icons-material/GetApp';

import { Spinner } from 'components/Spinner';
import { MediaType } from 'config/types/asset';

import { useDropFileArea } from './useDropFileArea';
import { useDropAssetMedia } from './useDropAssetMedia';

type Props = {
    assetId: string;
    mediaType: MediaType;
};

const StyledDropzone = styled(Box)<{
    isfocused: string;
    isdragreject: string;
    isdragaccept: string;
}>(
    ({ isdragreject, isdragaccept, theme }) => `
    width: 120px;
    height: 120px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-style: dashed;
    border-width: 1px;
    border-radius: 5px;
    border-color: ${(() => {
        if (isdragreject === 'true') return theme.palette.error.light;
        if (isdragaccept === 'true') return theme.palette.success.main;
        return theme.palette.primary.light;
    })()};
`
);

const StyledIcon = styled(GetAppIcon)<{
    isdragreject: string;
    isdragaccept: string;
}>(
    ({ isdragreject, isdragaccept, theme }) => `
    color: ${(() => {
        if (isdragreject === 'true') return theme.palette.error.light;
        if (isdragaccept === 'true') return theme.palette.success.main;
        return theme.palette.primary.light;
    })()};
`
);

export function DropFileArea({
    assetId,
    mediaType,
    ...props
}: Props): JSX.Element {
    const { submit, submitting } = useDropAssetMedia(assetId, mediaType);

    const {
        isFocused,
        isDragReject,
        isDragAccept,
        getRootProps,
        getInputProps
    } = useDropFileArea({
        onFilesDropped: submit,
        submitting,
        mediaType,
        ...props
    });

    return (
        <StyledDropzone
            {...getRootProps()}
            isfocused={isFocused.toString()}
            isdragreject={isDragReject.toString()}
            isdragaccept={isDragAccept.toString()}>
            <input {...getInputProps()} />
            {submitting ? (
                <Spinner />
            ) : (
                <StyledIcon
                    width={40}
                    height={40}
                    isdragreject={isDragReject.toString()}
                    isdragaccept={isDragAccept.toString()}
                />
            )}
        </StyledDropzone>
    );
}
