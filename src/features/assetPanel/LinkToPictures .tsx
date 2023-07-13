import Grid from '@mui/material/Grid';
import { Button } from '@/components/buttons/Button';

import { AssetMediaMetadata } from '@/config/types/asset';

type Props = {
    pics: AssetMediaMetadata[];
    onSelect: (picIndex: number) => void;
};

export function LinkToPictures({ pics, onSelect }: Props): JSX.Element {
    return (
        <Grid container spacing={2}>
            {pics.map((pic, index) => (
                <Grid key={pic.title} item>
                    <Button
                        sx={{
                            p: 1,
                            color: 'common.white',
                            bgcolor: 'secondary.main',
                            fontSize: 11,
                            '&:hover': {
                                bgcolor: 'secondary.light'
                            }
                        }}
                        textId={`photo ${index + 1}`}
                        onClick={() => onSelect(index)}
                    />
                </Grid>
            ))}
        </Grid>
    );
}
