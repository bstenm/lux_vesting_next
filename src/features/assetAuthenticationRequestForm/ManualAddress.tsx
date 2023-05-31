'use client';

import { Row } from 'components/Row';
import { CustomTextField } from 'components/CustomTextField';
import { AssetAuthenticationFormInput } from 'config/types/asset';

type Props = {
    disabled: boolean;
};

export function ManualAddress({ disabled }: Props): JSX.Element {
    return (
        <>
            <CustomTextField<AssetAuthenticationFormInput>
                label="Address*"
                name="address"
                disabled={disabled}
            />
            <Row spacing={2}>
                <CustomTextField<AssetAuthenticationFormInput>
                    label="City*"
                    name="city"
                    disabled={disabled}
                />
                <CustomTextField<AssetAuthenticationFormInput>
                    label="State*"
                    name="state"
                    disabled={disabled}
                />
                <CustomTextField<AssetAuthenticationFormInput>
                    label="Zip Code*"
                    name="zipCode"
                    disabled={disabled}
                />
            </Row>
        </>
    );
}
