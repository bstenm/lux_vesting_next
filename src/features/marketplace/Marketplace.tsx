'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';

import { Row } from 'components/Row';
import { AssetItem } from 'config/types/asset';
import { SearchInput } from 'features/SearchInput';
import { LightButton } from 'components/buttons/LightButton';
import { getAllAssets } from 'state/assets/selectors';
import { PlaceBidButton } from 'features/placeBid/PlaceBidButton';
import { useAppSelector } from 'libs/hooks/useAppSelector';

import { AssetList } from './AssetList';
import { useFilterList } from './useFilterList';
import { useOrderList } from './useOrderList';
import { SortingSelection } from './SortingSelection';
import { PriceRangeInput } from './PriceRangeInput';
import { useFetchMarketplace } from './useFetchMarketplace';
import { AdvancedFiltersPanel } from './AdvancedFiltersPanel';
import { AuctionTimeLeftFilter } from './AuctionTimeLeftFilter';

type Props = {
    onSelectitem: (data: AssetItem) => void;
};

export function Marketplace({ onSelectitem }: Props): JSX.Element {
    const searchTerm = useSearchParams().get('query');

    const list = useAppSelector(getAllAssets);

    const [filterList, addFilter] = useFilterList();

    const [orderList, addSorting] = useOrderList();

    const [getFetchList, fetching] = useFetchMarketplace();

    const [filterPanelIsOpen, setFilterPanelIsOpen] = useState<boolean>(false);

    const onToggleAdvancedFilter = (isOpen: boolean): void => {
        setFilterPanelIsOpen(isOpen);
    };

    const listToDisplay = useMemo(
        () => orderList(filterList(list)),
        [filterList, list, orderList]
    );

    useEffect(() => {
        (async () => {
            await getFetchList();
            if (searchTerm) {
                addFilter({ searchTerm });
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Row spacing={6}>
                <AuctionTimeLeftFilter onSelect={addFilter} />
                <SearchInput realTime onSubmit={addFilter} />
                <PriceRangeInput onSelect={addFilter} />
                <SortingSelection onSelect={addSorting} />
                <AdvancedFiltersPanel
                    onToggle={onToggleAdvancedFilter}
                    onSelectFilter={addFilter}
                />
            </Row>
            <AssetList<AssetItem>
                list={listToDisplay}
                loading={fetching}
                onSelectitem={onSelectitem}
                sx={{
                    mt: 6,
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
        </>
    );
}
