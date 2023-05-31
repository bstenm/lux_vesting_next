import * as yup from 'yup';

yup.setLocale({
    mixed: {
        default: 'invalid',
        notType: 'invalid type',
        required: 'required'
    },
    string: {
        min: 'tooShort',
        max: 'tooLong',
        email: 'invalidEmail'
    },
    number: {
        min: 'tooLow',
        max: 'tooHigh',
        integer: 'invalid'
    }
});

export const yupLocale = yup;
