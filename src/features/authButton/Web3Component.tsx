'use client';

import { useWeb3 } from './useWeb3';

type Props = {
    children: (initializing: boolean) => JSX.Element | JSX.Element[];
};

export function Web3Component({ children }: Props): JSX.Element {
    const { initializing } = useWeb3();

    return <>{children(initializing)}</>;
}
