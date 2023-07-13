import { ElementType, useCallback, useState } from 'react';

import { AssetItem } from '@/config/types/asset';
import { AssetSpecPanel } from '@/features/assetPanel/AssetSpecPanel';
import { AssetImagesPanel } from '@/features/assetPanel/AssetImagesPanel';
import { ComponentWithSelectedDataInDrawer } from '@/layouts/ComponentWithSelectedDataInDrawer';

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
            <AssetImagesPanel
                data={data}
                selected={picSelected}
                onSelectPic={(pic) => setPicSelected(pic)}
            />
        ),
        [picSelected]
    );

    const SpecsPanel = useCallback(
        (data: AssetItem, handleClose?: () => void) => (
            <AssetSpecPanel
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
