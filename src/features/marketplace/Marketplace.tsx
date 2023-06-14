'use client';

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
import { daysLeftForAuction } from 'libs/utils';
import { defaultAuctionDuration } from 'config';
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

    const [filter, setFilter] = useState<Record<string, unknown>>({});

    const [getFetchList, fetching] = useFetchMarketplace();

    const addFilter = (constraint: Record<string, unknown>): void => {
        setFilter({ ...filter, ...constraint });
    };

    const toggleDaysLeftFilter = (count: number): void => {
        if (filter.daysLeft === count) {
            const newFilter = { ...filter };
            delete newFilter.daysLeft;
            setFilter(newFilter);
            return;
        }
        setFilter({ ...filter, ...{ daysLeft: count } });
    };

    let listDisplayed = [...list];

    Object.keys(filter).forEach((type) => {
        const value = filter[type];

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
                ).map((count) => {
                    const selected = filter.daysLeft === count + 1;
                    return (
                        <RoundedGreyBox
                            sx={{ p: 1, cursor: 'pointer' }}
                            key={count}
                            light={selected}
                            onClick={() => toggleDaysLeftFilter(count + 1)}>
                            <Typography
                                color={
                                    selected ? 'primary.light' : 'common.white'
                                }
                                textId={count > 0 ? 'day_other' : 'day_one'}
                                variant="body2"
                                transVars={{ count: count + 1 }}
                            />
                        </RoundedGreyBox>
                    );
                })}
                <Badge color="error" badgeContent={Object.keys(filter).length}>
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
                onSelectFilter={addFilter}
            />
        </>
    );
}
