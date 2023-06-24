'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';

import { Row } from 'components/Row';
import { AssetItem } from 'config/types/asset';
import { LightButton } from 'components/buttons/LightButton';
import { getAllAssets } from 'state/assets/selectors';
import { PlaceBidButton } from 'features/placeBid/PlaceBidButton';
import { useAppSelector } from 'libs/hooks/useAppSelector';

import { AssetList } from './AssetList';
import { SearchInput } from './SearchInput';
import { useFilterList } from './useFilterList';
import { useOrderList } from './useOrderList';
import { BrandsSelection } from './BrandsSelection';
import { SortingSelection } from './SortingSelection';
import { PriceRangeInput } from './PriceRangeInput';
import { MerchantSelection } from './MerchantSelection';
import { useFetchMarketplace } from './useFetchMarketplace';
import { AdvancedFiltersPanel } from './AdvancedFiltersPanel';
import { AuctionTimeLeftFilter } from './AuctionTimeLeftFilter';

type Props = {
    onSelectitem: (data: AssetItem) => void;
};

export function Marketplace({ onSelectitem }: Props): JSX.Element {
    const searchQuery = useSearchParams().get('query');

    const list = useAppSelector(getAllAssets);

    const [orderList, addSorting] = useOrderList();

    const [getFetchList, fetching] = useFetchMarketplace();

    const [filter, filterList, addFilter, resetFilter] = useFilterList();

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
            if (searchQuery) {
                addFilter({ searchTerm: searchQuery });
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Row spacing={6}>
                <AuctionTimeLeftFilter
                    selected={filter.timeLeft}
                    onToggle={addFilter}
                />
                <SearchInput input={filter.searchTerm} onSubmit={addFilter} />
                <PriceRangeInput
                    toValue={filter.priceRangeTo}
                    fromValue={filter.priceRangeFrom}
                    onSelect={addFilter}
                />
                <SortingSelection onSelect={addSorting} />
                <AdvancedFiltersPanel onToggle={onToggleAdvancedFilter}>
                    <BrandsSelection onSelect={addFilter} />
                    <MerchantSelection onSelect={addFilter} />
                </AdvancedFiltersPanel>
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
