'use client';

import Grid from '@mui/material/Grid';
import { FormProvider } from 'react-hook-form';

import { Row } from 'components/Row';
import { LightButton } from 'components/buttons/LightButton';

import { useContractForm } from './useContactForm';
import { ContactFormField } from './ContactFormField';

export function ContactForm(): JSX.Element {
    const { onSubmit, submitting, formMethods } = useContractForm();

    return (
        <FormProvider {...formMethods}>
            <form
                noValidate
                autoComplete="off"
                onSubmit={formMethods.handleSubmit(onSubmit)}>
                <Grid spacing={3} container>
                    <Grid item xs={12} md={4}>
                        <ContactFormField autoFocus name="firstName" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <ContactFormField name="lastName" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <ContactFormField name="email" />
                    </Grid>
                    <Grid item xs={12}>
                        <ContactFormField
                            multiline
                            rows={6}
                            name="message"
                            placeholder="How Can We Help?"
                        />
                    </Grid>
                </Grid>
                <Row justifyContent="center">
                    <LightButton
                        type="submit"
                        textId="send"
                        loading={submitting}
                    />
                </Row>
            </form>
        </FormProvider>
    );
}
