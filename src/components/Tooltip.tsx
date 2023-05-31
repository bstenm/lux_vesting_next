'use client';

import { styled } from '@mui/material/styles';
import MuiTooltip, {
    TooltipProps,
    tooltipClasses
} from '@mui/material/Tooltip';

type Props = {
    title: string;
    children: React.ReactElement & React.ReactNode;
    maxWidth?: string;
    noFormatting?: boolean;
};

const Component = styled(({ className, ...props }: TooltipProps) => (
    <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 500,
        background: theme.palette.primary.dark
    }
}));

const Content = styled('div')<{ maxwidth?: string }>`
    overflow: hidden;
    max-width: ${(props) => props.maxwidth ?? '500px'};
    font-weight: 700;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export function Tooltip({
    title,
    children,
    maxWidth,
    noFormatting
}: Props): JSX.Element {
    return (
        <Component
            placement="top-start"
            title={<div style={{ fontSize: 14 }}>{title}</div>}>
            {noFormatting ? (
                children
            ) : (
                <Content maxwidth={maxWidth}>{children}</Content>
            )}
        </Component>
    );
}
