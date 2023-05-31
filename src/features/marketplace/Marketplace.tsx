'use client';

import remove from 'lodash/remove';
import uniqWith from 'lodash/uniqWith';
import { useState, useEffect } from 'react';

import { Row } from 'components/Row';
import { Badge } from 'components/Badge';
import { AssetItem } from 'config/types/asset';
import { LightButton } from 'components/buttons/LightButton';
import { getAllAssets } from 'state/assets/selectors';
import { PlaceBidButton } from 'features/placeBid/PlaceBidButton';
import { useAppSelector } from 'libs/hooks/useAppSelector';
import { SelectFilterEntry } from 'config/types';
import { RoundedBoxFilterIconButton } from 'components/iconButtons/RoundedBoxFilterIconButton';

import { AssetList } from './AssetList';
import { SearchFIlterPanel } from './SearchFIlterPanel';
import { useFetchMarketplace } from './useFetchMarketplace';

type Props = {
    onSelectitem: (data: AssetItem) => void;
};

export function Marketplace({ onSelectitem }: Props): JSX.Element {
    const [filterPanelIsOpen, setFilterPanelIsOpen] = useState<boolean>(false);

    const toggleFilterPanel = (): void => {
        setFilterPanelIsOpen(!filterPanelIsOpen);
    };
    const list = useAppSelector(getAllAssets);

    const [filters, setFilters] = useState<SelectFilterEntry[]>([]);

    const [getFetchList, fetching] = useFetchMarketplace();

    const onSelectFilter = (entry: SelectFilterEntry): void => {
        // Push the new filter entry at the beginning of the array
        filters.unshift(entry);
        // Only keep the last added entry for a specific filter
        const uniqFilters = uniqWith(filters, (a, b) => a.id === b.id);
        // Remove filters that have been unselected
        remove(uniqFilters, (e) => !e.selected || !e.value || !e.value.length);
        setFilters(uniqFilters);
    };

    useEffect(() => {
        (async () => {
            await getFetchList({ filters });
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    return (
        <>
            <Badge color="error" badgeContent={filters.length}>
                <RoundedBoxFilterIconButton onClick={toggleFilterPanel} />
            </Badge>
            <AssetList<AssetItem>
                list={list}
                loading={fetching}
                onSelectitem={onSelectitem}
                sx={{
                    mt: 4,
                    width: `calc(100vw - ${filterPanelIsOpen ? 450 : 150}px)`
                }}>
                {(asset) => (
                    <Row sx={{ width: '100%' }} justifyContent="space-between">
                        <LightButton
                            sx={{ mr: 4 }}
                            textId="view"
                            onClick={() => onSelectitem(asset)}
                        />
                        <PlaceBidButton data={asset} />
                    </Row>
                )}
            </AssetList>
            <SearchFIlterPanel
                isOpen={filterPanelIsOpen}
                onSelectFilter={onSelectFilter}
            />
        </>
    );
}
