'use client';

import Grid from '@mui/material/Grid';

import { Row } from '@/components/Row';
import { BidIcon } from '@/components/icons/BidIcon';
import { ViewIcon } from '@/components/icons/ViewIcon';
import { formatDate } from '@/libs/utils';
import { Typography } from '@/components/Typography';
import { FavoriteIcon } from '@/components/icons/FavoriteIcon';
import { CalendarIcon } from '@/components/icons/CalendarIcon';
import { AssetListingData } from '@/config/types/asset';

export function ListingData({
    bids = [],
    updatedAt,
    nbOfTimesSaved = 0,
    nbOfTimesViewed = 0
}: AssetListingData): JSX.Element {
    return (
        <Grid
            container
            sx={{ my: 2, width: 400 }}
            spacing={3}
            justifyContent="left">
            <Grid item xs={8}>
                <Row spacing={3}>
                    <CalendarIcon size="medium" />
                    <Typography capitalized textId="listedOn" suffix=":" />
                </Row>
            </Grid>
            <Grid item xs={4}>
                <Row>
                    <Typography sx={{ color: 'primary.light' }}>
                        {formatDate(updatedAt)}
                    </Typography>
                </Row>
            </Grid>
            <Grid item xs={8}>
                <Row spacing={3}>
                    <BidIcon />
                    <Typography capitalized textId="numberOfBids" suffix=":" />
                </Row>
            </Grid>
            <Grid item xs={4}>
                <Row>
                    <Typography bold sx={{ color: 'primary.light' }}>
                        {bids.length}
                    </Typography>
                </Row>
            </Grid>
            <Grid item xs={8}>
                <Row spacing={3}>
                    <ViewIcon size="medium" />
                    <Typography capitalized textId="numberOfViews" suffix=":" />
                </Row>
            </Grid>
            <Grid item xs={4}>
                <Row>
                    <Typography bold sx={{ color: 'primary.light' }}>
                        {nbOfTimesViewed}
                    </Typography>
                </Row>
            </Grid>
            <Grid item xs={8}>
                <Row spacing={3}>
                    <FavoriteIcon size="medium" />
                    <Typography capitalized textId="numberOfSaves" suffix=":" />
                </Row>
            </Grid>
            <Grid item xs={4}>
                <Row>
                    <Typography bold sx={{ color: 'primary.light' }}>
                        {nbOfTimesSaved}
                    </Typography>
                </Row>
            </Grid>
        </Grid>
    );
}
