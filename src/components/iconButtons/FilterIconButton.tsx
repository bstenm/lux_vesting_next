'use client';

import FilterListIcon from '@mui/icons-material/FilterList';
import { OverridableStringUnion } from '@mui/types';
import { SvgIconPropsSizeOverrides } from '@mui/material/SvgIcon';

import { Row } from 'components/Row';
import { Typography } from 'components/Typography';
import { IconButton } from 'components/iconButtons/IconButton';

type Props = React.ComponentProps<typeof IconButton> & {
    size?:
        | OverridableStringUnion<
              'small' | 'inherit' | 'large' | 'medium',
              SvgIconPropsSizeOverrides
          >
        | undefined;
};

export function FilterIconButton({ size, ...props }: Props): JSX.Element {
    return (
        <IconButton {...props}>
            <Row spacing={1} alignItems="center">
                <FilterListIcon
                    sx={{ color: 'common.white' }}
                    fontSize={size ?? 'small'}
                />
                <Typography
                    capitalized
                    sx={{ position: 'relative', top: 2 }}
                    variant="caption"
                    textId="filter"
                />
            </Row>
        </IconButton>
    );
}
