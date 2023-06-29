'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { FormProvider } from 'react-hook-form';

import { Row } from '@/components/Row';
import { DarkButton } from '@/components/buttons/DarkButton';
import { LightButton } from '@/components/buttons/LightButton';
import { CustomTextField } from '@/components/CustomTextField';

import { FormInput, useDenialNotesForm } from './useDenialNotesForm';

type Props = {
    onSave: (notes?: string) => void;
    onCancel: () => void;
};

export function DenialNotesForm(props: Props): JSX.Element {
    const { onClose, onSubmit, submitting, formMethods } =
        useDenialNotesForm(props);

    return (
        <FormProvider {...formMethods}>
            <form
                noValidate
                autoComplete="off"
                onSubmit={formMethods.handleSubmit(onSubmit)}>
                <Box sx={{ my: 3, mb: 0 }}>
                    <Row spacing={3}>
                        <Stack spacing={3} sx={{ flex: 3 }}>
                            <CustomTextField<FormInput>
                                rows={5}
                                label="enterReasons"
                                name="denialNotes"
                                multiline
                                required
                            />
                        </Stack>
                    </Row>
                </Box>
                <Row sx={{ mt: 3 }} justifyContent="space-between">
                    <DarkButton
                        textId="cancel"
                        onClick={onClose}
                        disabled={submitting}
                    />
                    <LightButton
                        type="submit"
                        textId="submit"
                        loading={submitting}
                    />
                </Row>
            </form>
        </FormProvider>
    );
}
