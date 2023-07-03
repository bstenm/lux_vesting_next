'use client';

import Box from '@mui/material/Box';
import { useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useFormContext } from 'react-hook-form';
import { usePlacesWidget } from 'react-google-autocomplete';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import { Row } from '@/components/Row';
import { Typography } from '@/components/Typography';
import { CustomTextField } from '@/components/CustomTextField';

type Props = {
    disabled: boolean;
};

export function AddressAutocompleteInput({ disabled }: Props): JSX.Element {
    const [edit, setEdit] = useState<boolean>(true);

    const { register, setValue, reset } = useFormContext();

    const [entrySelected, setEntrySelected] = useState<string>();

    const { ref: materialRef } = usePlacesWidget({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE,
        onPlaceSelected: (place) => {
            setEdit(false);
            setValue('address', place.formatted_address);
            setEntrySelected(place.formatted_address);
        },
        options: {
            types: ['address'],
            fields: ['formatted_address'],
            componentRestrictions: { country: ['us', 'ca'] }
        }
    });

    const onRemove = (): void => {
        setEdit(true);
        reset();
    };

    return (
        <>
            <Box sx={{ zIndex: 100000 }}>
                <CustomTextField
                    fullWidth
                    disabled={disabled || !edit}
                    inputRef={materialRef}
                    inputStyle={{
                        backgroundColor: !edit ? '#555' : '#fff'
                    }}
                    {...register('address')}
                />
            </Box>
            {entrySelected && !edit && (
                <Row spacing={1} justifyContent="center">
                    <LocationOnOutlinedIcon sx={{ color: 'primary.main' }} />
                    <Typography sx={{ pr: 1, color: 'primary.main' }}>
                        {entrySelected}
                    </Typography>
                    <HighlightOffIcon
                        sx={{ color: 'secondary.100' }}
                        onClick={onRemove}
                        fontSize="small"
                    />
                </Row>
            )}
        </>
    );
}

// TODO: Remove?
// type Location = {
//     state?: string;
//     route?: string;
//     locality?: string;
//     country?: string;
//     streetNb?: string;
//     postcode?: string;
//     pluscode?: string;
// };

// const getAddressAsMap = (
//     components: google.maps.GeocoderAddressComponent[]
// ): Location =>
//     components.reduce(
//         (
//             acc: Location,
//             component: google.maps.GeocoderAddressComponent
//         ): Location => {
//             const componentType = component.types[0];
//             switch (componentType) {
//                 case 'plus_code':
//                     acc.pluscode = component.long_name;
//                     return acc;
//                 case 'street_number':
//                     acc.streetNb = component.long_name;
//                     return acc;
//                 case 'route':
//                     acc.route += component.short_name;
//                     return acc;
//                 case 'postal_code':
//                     acc.postcode = `${component.long_name}${acc.postcode}`;
//                     return acc;
//                 case 'postal_code_suffix':
//                     acc.postcode = `${acc.postcode}-${component.long_name}`;
//                     return acc;
//                 case 'locality':
//                     acc.locality = component.long_name;
//                     return acc;
//                 case 'administrative_area_level_1':
//                     acc.state = component.short_name;
//                     return acc;
//                 case 'country':
//                     acc.country = component.long_name;
//                     return acc;
//                 default:
//                     return acc;
//             }
//         },
//         {}
//     );

/* <Grid container>
<Grid item xs={6}>
	Street Number:
</Grid>
<Grid item xs={6}>
	{entrySelected.streetNb}
</Grid>
<Grid item xs={6}>
	Zip code:
</Grid>
<Grid item xs={6}>
	{entrySelected.postcode}
</Grid>
<Grid item xs={6}>
	Plus code:
</Grid>
<Grid item xs={6}>
	{entrySelected.pluscode}
</Grid>
<Grid item xs={6}>
	Locality:
</Grid>
<Grid item xs={6}>
	{entrySelected.locality}
</Grid>
<Grid item xs={6}>
	State:
</Grid>
<Grid item xs={6}>
	{entrySelected.state}
</Grid>
<Grid item xs={6}>
	Country:
</Grid>
<Grid item xs={6}>
	{entrySelected.country}
</Grid>
</Grid> */
