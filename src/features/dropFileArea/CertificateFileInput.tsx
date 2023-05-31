'use client';

import { DropFileAreaWithPreview } from './DropFileAreaWithPreview';

type Props = {
    disabled: boolean;
    onFileDropped?: () => void;
    onFileRemoved?: () => void;
};

export function CertificateFileInput({
    disabled,
    onFileDropped,
    onFileRemoved
}: Props): JSX.Element {
    return (
        <DropFileAreaWithPreview
            textId="uploadCertificateOfOwnershipFile"
            fileType="document"
            disabled={disabled}
            fieldName="certificateOfAuthenticityFile"
            onFileDropped={onFileDropped}
            onFileRemoved={onFileRemoved}
        />
    );
}
