'use client';

type Props = {
    data: string;
    children: React.ReactNode;
};

export function WithData({ data, children }: Props): JSX.Element {
    return data ? <>{children}</> : <div />;
}
