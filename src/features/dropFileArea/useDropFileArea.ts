'use client';

import { useCallback } from 'react';
import { DropzoneState, FileRejection, useDropzone } from 'react-dropzone';

import { useAlert } from 'features/alert/useAlert';
import { MediaType } from 'config/types/asset';
import { FileTooLargeError } from 'libs/customErrors';
import { fileMaxSize, allowedFileMimes } from 'config';

type Props = {
    mediaType: MediaType;
    submitting?: boolean;
    onFilesDropped: (file: File) => void;
    onFileRemoved?: () => void;
};

type StateLogic = DropzoneState & {
    onDelete: () => void;
};

export const useDropFileArea = ({
    submitting,
    mediaType,
    onFileRemoved,
    onFilesDropped
}: Props): StateLogic => {
    const maxSize = fileMaxSize[mediaType];

    const allowedMimes = allowedFileMimes[mediaType];

    const { errorAlert } = useAlert();

    const onDelete = (): void => {
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
                if (pickedFile.size > maxSize) {
                    throw new FileTooLargeError();
                }
                onFilesDropped(pickedFile);
            } catch (e) {
                errorAlert(
                    e instanceof FileTooLargeError
                        ? 'fileTooLargeError'
                        : 'unexpectedError'
                );
            }
        },
        [errorAlert, maxSize, onFilesDropped]
    );

    const onDropRejected = (fileRejections: FileRejection[]): void => {
        console.log(fileRejections);
    };

    const dropzoneState = useDropzone({
        onDrop,
        onDropRejected,
        accept: allowedMimes,
        disabled: submitting,
        maxFiles: 1
    });

    return { onDelete, ...dropzoneState };
};
