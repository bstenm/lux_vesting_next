'use client';

import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { forwardRef } from 'react';
import OptionUnstyled from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import SelectUnstyled, { SelectUnstyledProps } from '@mui/base/SelectUnstyled';

const StyledButton = styled('button')(
    ({ theme }) => `
      height: 35px;
	  cursor: pointer;
      border: 1px solid ${theme.palette.common.white};
      font-size: 15px;
      background: transparent;
      color: ${theme.palette.common.white};
  `
);

const StyledListbox = styled('ul')`
    z-index: 1000;
    margin: 0;
    margin-top: 8px;
    outline: 0;
    padding: 0;
    overflow: auto;
    box-sizing: border-box;
`;

const StyledPopper = styled(PopperUnstyled)`
    z-index: 1000;
`;

export const Option = styled(OptionUnstyled)(
    ({ theme }) => `
        cursor: pointer;
        padding: 9px;
        list-style: none;
        font-size: 15px;
        color: ${theme.palette.common.white};
		background: ${theme.palette.common.black};
        &:hover {
			background: ${grey[900]};
        }
  `
);

function SelectComponent<TValue extends string>(
    props: SelectUnstyledProps<TValue> & { label: string },
    ref: React.ForwardedRef<HTMLButtonElement>
): JSX.Element {
    const components = {
        Root: StyledButton,
        Listbox: StyledListbox,
        Popper: StyledPopper
    };

    return <SelectUnstyled {...props} ref={ref} components={components} />;
}

export const CustomSelect = forwardRef(SelectComponent) as <
    TValue extends string
>(
    props: SelectUnstyledProps<TValue> & {
        label: string;
    } & React.RefAttributes<HTMLButtonElement>
) => JSX.Element;
