import { forwardRef } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

import { defaultCurrencySymbol } from '@/config';

type CustomNumericFormatProps = {
    onChange: (event: { target: { value: string } }) => void;
    name: string;
};

export const CustomNumericFormat = forwardRef<
    NumericFormatProps,
    CustomNumericFormatProps
>(function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) =>
                onChange({
                    target: {
                        value: values.value
                    }
                })
            }
            thousandSeparator
            valueIsNumericString
            prefix={`${defaultCurrencySymbol} `}
        />
    );
});
