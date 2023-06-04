'use client';

import { Row } from 'components/Row';
import { AssetCard } from 'features/assetCard/AssetCard';
import { AssetItem } from 'config/types/asset';
import { FetchingScreen } from 'components/FetchingScreen';

type Props<T> = Omit<React.ComponentProps<typeof Row>, 'children'> & {
    list: T[];
    loading: boolean;
    children: (item: T) => React.ReactNode;
    onSelectitem: (item: T) => void;
};

export function AssetList<T extends AssetItem>({
    sx,
    list,
    loading,
    children,
    onSelectitem,
    ...other
}: Props<T>): JSX.Element {
    return (
        <FetchingScreen<T[]> data={list} fetching={loading}>
            {(data: T[]) => (
                <Row sx={{ gap: 8, flexWrap: 'wrap', ...sx }} {...other}>
                    {data.map((item: T) => (
                        <AssetCard<T>
                            key={item.id}
                            data={item}
                            onSelect={() => onSelectitem(item)}>
                            {children(item)}
                        </AssetCard>
                    ))}
                </Row>
            )}
        </FetchingScreen>
    );
}
