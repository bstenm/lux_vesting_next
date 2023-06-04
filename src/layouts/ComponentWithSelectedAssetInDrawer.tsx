import { ElementType, useCallback, useState } from 'react';

import { AssetItem } from 'config/types/asset';
import { MarketItemSpecPanel } from 'features/marketItemPanel/MarketItemSpecPanel';
import { MarketItemImagesPanel } from 'features/marketItemPanel/MarketItemImagesPanel';
import { ComponentWithSelectedDataInDrawer } from 'layouts/ComponentWithSelectedDataInDrawer';

type Props = {
    Actions?: ElementType;
    MainComponent: ElementType;
};

export function ComponentWithSelectedAssetInDrawer({
    Actions,
    MainComponent
}: Props): JSX.Element {
    const [picSelected, setPicSelected] = useState<number>();

    const ImagesPanel = useCallback(
        (data: AssetItem) => (
            <MarketItemImagesPanel
                data={data}
                selected={picSelected}
                onSelectPic={(pic) => setPicSelected(pic)}
            />
        ),
        [picSelected]
    );

    const SpecsPanel = useCallback(
        (data: AssetItem, handleClose?: () => void) => (
            <MarketItemSpecPanel
                data={data}
                Actions={Actions}
                selected={picSelected}
                onSelectPic={(pic) => setPicSelected(pic)}
                handleClose={handleClose}
            />
        ),
        [picSelected, Actions]
    );

    return (
        <ComponentWithSelectedDataInDrawer<AssetItem>
            noLeftPanelPadding
            rightPanelWidth={350}
            MainComponent={MainComponent}
            leftPanelComponent={ImagesPanel}
            rightPanelComponent={SpecsPanel}
        />
    );
}
