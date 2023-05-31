'use client';

import Link from 'next/link';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { MenuItem } from 'react-pro-sidebar';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { Typography } from 'components/Typography';

type Props = {
    Icon:
        | React.FunctionComponent<
              React.SVGProps<SVGSVGElement> & { title?: string | undefined }
          >
        | (OverridableComponent<
              SvgIconTypeMap<Record<string, unknown>, 'svg'>
          > & {
              muiName: string;
          });
    title: string;
    path?: string;
    onClick?: () => void;
};

const Item = styled(MenuItem)`
    padding: 7px;
    font-size: 17px;
    &:hover {
        border-radius: 2px;
        background: ${grey[800]};
    }
`;

export function MenuLink({ Icon, path, title, onClick }: Props): JSX.Element {
    function Text(): JSX.Element {
        return (
            <Typography
                allCapitalized
                title={title}
                textId={title}
                variant="body2"
                fontSize={18}
            />
        );
    }

    return (
        <Item icon={<Icon width={25} />} onClick={onClick}>
            {path ? (
                <Link href={path}>
                    <Text />
                </Link>
            ) : (
                <Text />
            )}
        </Item>
    );
}
