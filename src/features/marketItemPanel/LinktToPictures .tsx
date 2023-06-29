import Grid from '@mui/material/Grid';
import { purple } from '@mui/material/colors';
import { Button } from '@/components/buttons/Button';

import { AssetMediaMetadata } from '@/config/types/asset';

type Props = {
    pics: AssetMediaMetadata[];
    onSelect: (picIndex: number) => void;
};

export function LinktToPictures({ pics, onSelect }: Props): JSX.Element {
    return (
        <Grid container spacing={2}>
            {pics.map((pic, index) => (
                <Grid key={pic.title} item>
                    <Button
                        sx={{
                            p: 1,
                            color: 'common.white',
                            bgcolor: purple[400],
                            fontSize: 11,
                            '&:hover': {
                                bgcolor: purple[500]
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
