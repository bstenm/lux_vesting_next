'use client';

import { Path } from 'react-hook-form';

import { Row } from 'components/Row';
import { Typography } from 'components/Typography';
import { CustomTextField } from 'components/CustomTextField';
import { ContactFormInput } from 'config/types';

type Props = React.ComponentProps<typeof CustomTextField>;

export function ContactFormField({ name, ...other }: Props): JSX.Element {
    return (
        <>
            <Row>
                <Typography capitalized textId={name} variant="h6" />
                <Typography variant="h6">*</Typography>
            </Row>
            <CustomTextField<ContactFormInput>
                noLabel
                size="medium"
                name={name as Path<ContactFormInput>}
                {...other}
            />
        </>
    );
}
