'use client';

import remove from 'lodash/remove';
import uniqWith from 'lodash/uniqWith';
import { useState, useEffect } from 'react';

import { Row } from 'components/Row';
import { Badge } from 'components/Badge';
import { AssetItem } from 'config/types/asset';
import { Typography } from 'components/Typography';
import { LightButton } from 'components/buttons/LightButton';
import { getAllAssets } from 'state/assets/selectors';
import { PlaceBidButton } from 'features/placeBid/PlaceBidButton';
import { useAppSelector } from 'libs/hooks/useAppSelector';
import { SelectFilterEntry } from 'config/types';
import { RoundedGreyBox } from 'components/RoundedGreyBox';
import { defaultAuctionDuration } from 'config';
import { RoundedBoxFilterIconButton } from 'components/iconButtons/RoundedBoxFilterIconButton';

import { daysLeftForAuction } from 'libs/utils';
import { uniqBy } from 'lodash';
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

    const [filters, setFilters] = useState<Record<string, unknown>[]>([]);

    const [getFetchList, fetching] = useFetchMarketplace();

    const addFilter = (constraint: Record<string, unknown>): void => {
        const newFilters = [...filters];
        remove(
            newFilters,
            (e) => Object.keys(e)[0] === Object.keys(constraint)[0]
        );
        setFilters(newFilters.concat(constraint));
    };

    const onSelectFilter = (entry: SelectFilterEntry): void => {
        // Push the new filter entry at the beginning of the array
        // filters.unshift(entry);
        // // Only keep the last added entry for a specific filter
        // const uniqFilters = uniqWith(filters, (a, b) => a.id === b.id);
        // // Remove filters that have been unselected
        // remove(uniqFilters, (e) => !e.selected || !e.value || !e.value.length);
        // setFilters(uniqFilters);
    };

    let listDisplayed = [...list];

    filters.forEach((filter) => {
        const type = Object.keys(filter)[0];
        const value = Object.values(filter)[0];

        switch (type) {
            case 'daysLeft':
                listDisplayed = listDisplayed.filter((e) => {
                    const { updatedAt } = e.listing ?? {};
                    if (!updatedAt) return false;
                    const daysLeft = daysLeftForAuction(Date.now(), updatedAt);
                    return daysLeft === value;
                });
                break;
            default:
        }
    });

    useEffect(() => {
        (async () => {
            await getFetchList();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Row spacing={2}>
                {Array.from(
                    { length: defaultAuctionDuration },
                    (x, i) => i
                ).map((count) => (
                    <RoundedGreyBox
                        light={filters}
                        sx={{ p: 1, cursor: 'pointer' }}
                        key={count}
                        onClick={() =>
                            addFilter({ type: 'daysLeft', value: count + 1 })
                        }>
                        <Typography
                            sx={{ color: '#252525' }}
                            textId={count > 0 ? 'day_other' : 'day_one'}
                            variant="body2"
                            transVars={{ count: count + 1 }}
                        />
                    </RoundedGreyBox>
                ))}
                <Badge color="error" badgeContent={filters.length}>
                    <RoundedBoxFilterIconButton onClick={toggleFilterPanel} />
                </Badge>
            </Row>
            <AssetList<AssetItem>
                list={listDisplayed}
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
