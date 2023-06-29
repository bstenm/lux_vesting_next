'use client';

import MuiButton from '@mui/material/Button';
import { useState } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import SwipeableViews from 'react-swipeable-views';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import { styled, useTheme } from '@mui/material/styles';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { AssetMediaMetadata } from '@/config/types/asset';
import { BrokenImagePlaceholder } from '@/components/BrokenImagePlaceholder';

import { ImageCarouselItem } from './ImageCarouselItem';

type Props = BoxProps & {
    images: AssetMediaMetadata[];
    onSelect?: () => void;
};

const Button = styled(MuiButton)<{ hidden: boolean }>(({ hidden, theme }) => ({
    pos: 'relative',
    color: theme.palette.primary.light,
    display: hidden ? 'none' : 'block',
    height: 32,
    minWidth: 30,
    borderRadius: 0,
    backgroundColor: theme.palette.common.black,
    '&:hover': {
        backgroundColor: theme.palette.common.black
    }
}));

export function ImageCarousel({
    images,
    onSelect,
    ...props
}: Props): JSX.Element {
    const theme = useTheme();

    const [activeStep, setActiveStep] = useState(0);

    const maxSteps = images.length;

    const handleNext = (): void => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = (): void => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number): void => {
        setActiveStep(step);
    };

    return !images.length ? (
        <BrokenImagePlaceholder />
    ) : (
        <Box>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents>
                {images.map((step, index) => (
                    <div key={step.uri}>
                        {Math.abs(activeStep - index) <= 2 && (
                            <ImageCarouselItem
                                data={step}
                                onSelect={onSelect}
                                {...props}
                            />
                        )}
                    </div>
                ))}
            </SwipeableViews>
            <MobileStepper
                sx={{
                    mt: -5.8,
                    width: 223,
                    bgcolor: 'transparent',
                    position: 'absolute',
                    '& .MuiMobileStepper-dots': {
                        visibility: 'hidden'
                    }
                }}
                steps={maxSteps}
                variant="dots"
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        sx={{ right: -8, borderRadius: '4px 0 0 0' }}
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                        hidden={activeStep === maxSteps - 1}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button
                        size="small"
                        sx={{
                            left: -8,
                            borderRadius: '0 4px 0 0'
                        }}
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        hidden={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                    </Button>
                }
            />
        </Box>
    );
}
