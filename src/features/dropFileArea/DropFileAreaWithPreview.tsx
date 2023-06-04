'use client';

import { styled } from '@mui/material/styles';
import GetAppIcon from '@mui/icons-material/GetApp';
import { useDropzone } from 'react-dropzone';
import { ErrorMessage } from '@hookform/error-message';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useFormContext } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { FormControl, Stack, Box } from '@mui/material';

import { Row } from 'components/Row';
import PdfIcon from 'assets/pdf.svg';
import { Image } from 'components/Image';
import { useAlert } from 'features/alert/useAlert';
import { MediaType } from 'config/types/asset';
import { Typography } from 'components/Typography';
import { FormHelperText } from 'components/FormHelperText';
import { FileTooLargeError } from 'libs/customErrors';
import { allowedFileMimes, fileMaxSize } from 'config';

type Props = {
    textId?: string;
    fileType: MediaType;
    disabled?: boolean;
    fieldName: string;
    onFileDropped?: () => void;
    onFileRemoved?: () => void;
};

const Dropzone = styled('div')<{
    isfocused: string;
    isdragreject: string;
    isdragaccept: string;
}>(
    ({ isdragreject, isdragaccept, theme }) => `
    height: 100%;
    cursor: pointer;
    padding: ${theme.spacing(4)};
    text-align: center;
    border-radius: 8px;
    border-width: 1px;
    border-style: dashed;
    border-color: ${(() => {
        if (isdragreject === 'true') return theme.palette.error.light;
        if (isdragaccept === 'true') return theme.palette.success.main;
        return theme.palette.primary.light;
    })()};
`
);

export function DropFileAreaWithPreview({
    textId,
    disabled,
    fileType,
    fieldName,
    onFileDropped,
    onFileRemoved
}: Props): JSX.Element {
    const { errorAlert } = useAlert();

    const {
        register,
        setValue,
        formState: { errors }
    } = useFormContext();

    const error = errors?.[fieldName]?.message;

    const [newFile, setNewFile] = useState<File>();

    const onDelete = (): void => {
        setNewFile(undefined);
        if (onFileRemoved) {
            onFileRemoved();
        }
    };

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            try {
                // Exit if no valid files passed
                if (acceptedFiles.length < 1) return;
                const pickedFile = acceptedFiles[0];
                // Restricts the max file size
                if (pickedFile.size > fileMaxSize[fileType]) {
                    throw new FileTooLargeError();
                }
                // Set the value for this field in react-hook-form
                setValue(fieldName, pickedFile, { shouldValidate: true });
                // Set the new file picked by the user with its preview added
                const preview = URL.createObjectURL(pickedFile);
                setNewFile(Object.assign(pickedFile, { preview }));
                if (onFileDropped) {
                    onFileDropped();
                }
            } catch (e) {
                errorAlert(
                    e instanceof FileTooLargeError
                        ? 'fileTooLargeError'
                        : 'unexpectedError'
                );
            }
        },
        [errorAlert, setValue, fieldName, fileType, onFileDropped]
    );

    const {
        isFocused,
        isDragReject,
        isDragAccept,
        getRootProps,
        getInputProps
    } = useDropzone({
        onDrop,
        accept: allowedFileMimes[fileType],
        disabled,
        maxFiles: 1
    });

    let color = 'primary.light';
    let msgId = textId || 'dropFilesOrClickHere';

    if (isDragReject) {
        color = 'error.light';
        msgId = 'File type not allowed';
    } else if (isDragAccept) {
        color = 'success.main';
    }

    const ErrorMsg = useCallback((): JSX.Element => {
        return (
            <ErrorMessage
                errors={errors}
                name={fieldName}
                render={({ message }) => <FormHelperText textId={message} />}
            />
        );
    }, [errors, fieldName]);

    return newFile?.name ? (
        <Stack sx={{ py: 2 }}>
            <Row spacing={2} alignItems="center" justifyContent="center">
                {fileType === 'document' ? (
                    <PdfIcon width={50} height={50} />
                ) : (
                    <Image
                        sx={{ borderRadius: 1 }}
                        alt="assetCover"
                        uri={URL.createObjectURL(newFile)}
                        width={120}
                        height={120}
                    />
                )}
                <Typography noWrap variant="body2">
                    {newFile.name}
                </Typography>
                {!disabled && (
                    <HighlightOffIcon
                        sx={{ width: 40, color: 'primary.light' }}
                        onClick={onDelete}
                    />
                )}
            </Row>
            {error && (
                <Box sx={{ mt: 2, mx: 'auto' }}>
                    <ErrorMsg />
                </Box>
            )}
        </Stack>
    ) : (
        <FormControl sx={{ width: '100%', height: '100%' }}>
            <Dropzone
                {...getRootProps()}
                isfocused={isFocused.toString()}
                isdragreject={isDragReject.toString()}
                isdragaccept={isDragAccept.toString()}>
                <input {...register(fieldName)} {...getInputProps()} />
                <Row spacing={2} alignItems="center" justifyContent="center">
                    <GetAppIcon sx={{ color }} height={40} width={40} />
                    <Typography
                        capitalized
                        sx={{ color }}
                        bold={isDragReject}
                        textId={msgId}
                        variant="body2"
                    />
                </Row>
            </Dropzone>
            {error && <ErrorMsg />}
        </FormControl>
    );
}
