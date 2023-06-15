'use client';

import { orderBy } from 'lodash';
import { useState, useEffect, useMemo } from 'react';

import { Row } from 'components/Row';
import { Badge } from 'components/Badge';
import { AssetItem } from 'config/types/asset';
import { LightButton } from 'components/buttons/LightButton';
import { getAllAssets } from 'state/assets/selectors';
import { PlaceBidButton } from 'features/placeBid/PlaceBidButton';
import { useAppSelector } from 'libs/hooks/useAppSelector';
import { daysLeftForAuction } from 'libs/utils';
import { RoundedBoxFilterIconButton } from 'components/iconButtons/RoundedBoxFilterIconButton';

import { AssetList } from './AssetList';
import { SearchFIlterPanel } from './SearchFIlterPanel';
import { useFetchMarketplace } from './useFetchMarketplace';
import { AuctionTimeLeftFilter } from './AuctionTimeLeftFilter';
import { SortOptionValue, SortingSelection } from './SortingSelection';

type Props = {
    onSelectitem: (data: AssetItem) => void;
};

export function Marketplace({ onSelectitem }: Props): JSX.Element {
    const [filterPanelIsOpen, setFilterPanelIsOpen] = useState<boolean>(false);

    const toggleFilterPanel = (): void => {
        setFilterPanelIsOpen(!filterPanelIsOpen);
    };

    const list = useAppSelector(getAllAssets);

    const [filter, setFilter] = useState<Record<string, unknown>>({});

    const [getFetchList, fetching] = useFetchMarketplace();

    const addFilter = (constraint: Record<string, unknown>): void => {
        setFilter({ ...filter, ...constraint });
    };

    const nbOfFiltersApplied = Object.values(filter).filter((e) => e).length;

    const listDisplayed = useMemo(() => {
        let listClone = [...list];

        Object.keys(filter).forEach((type) => {
            const value = filter[type];

            const { key, direction } = (value as SortOptionValue) ?? {};

            switch (type) {
                case 'daysLeft':
                    listClone = listClone.filter((e) => {
                        if (!value) return true;
                        const { updatedAt } = e.listing ?? {};
                        if (!updatedAt) return false;
                        const daysLeft = daysLeftForAuction(
                            Date.now(),
                            updatedAt
                        );
                        return daysLeft <= (value as number);
                    });
                    break;
                case 'orderBy':
                    listClone = key
                        ? orderBy(listClone, [key], [direction])
                        : listClone;
                    break;
                default:
            }
        });

        return listClone;
    }, [list, filter]);

    useEffect(() => {
        (async () => {
            await getFetchList();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Row spacing={2}>
                <AuctionTimeLeftFilter onSelect={addFilter} />
                <SortingSelection onSelect={addFilter} />
                <Badge color="error" badgeContent={nbOfFiltersApplied}>
                    <RoundedBoxFilterIconButton onClick={toggleFilterPanel} />
                </Badge>
            </Row>
            <AssetList<AssetItem>
                list={listDisplayed}
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
            <SearchFIlterPanel
                isOpen={filterPanelIsOpen}
                onSelectFilter={addFilter}
            />
        </>
    );
}
