'use client';

import Box from '@mui/material/Box';
import { useState } from 'react';

export function ImageMagnifier({
    src,
    magnifierHeight = 300,
    magnifieWidth = 300,
    zoomLevel = 3,
    mouseOffsetPosX = 0,
    backgroundOffsetPosX = 0,
    mouseOffsetPosY = 0,
    backgroundOffsetPosY = 0
}: {
    src: string;
    magnifierHeight?: number;
    magnifieWidth?: number;
    zoomLevel?: number;
    mouseOffsetPosX?: number;
    backgroundOffsetPosX?: number;
    mouseOffsetPosY?: number;
    backgroundOffsetPosY?: number;
}): JSX.Element {
    const [[x, y], setXY] = useState<number[]>([0, 0]);

    const [[imgWidth, imgHeight], setSize] = useState<number[]>([0, 0]);

    const [showMagnifier, setShowMagnifier] = useState<boolean>(false);

    return (
        <>
            <Box
                component="img"
                src={src}
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'cover',
                    objectPosition: 'center'
                }}
                onMouseEnter={(e) => {
                    // update image size and turn-on magnifier
                    const elem = e.currentTarget;
                    const { width: w, height: h } =
                        elem.getBoundingClientRect();
                    setSize([w, h]);
                    setShowMagnifier(true);
                }}
                onMouseMove={(e) => {
                    // update cursor position
                    const elem = e.currentTarget;
                    const { top, left } = elem.getBoundingClientRect();

                    // calculate cursor position on the image
                    const cx =
                        e.pageX - left - window.pageXOffset + mouseOffsetPosX;
                    const cy =
                        e.pageY - top - window.pageYOffset + mouseOffsetPosY;
                    setXY([cx, cy]);
                }}
                onMouseLeave={() => {
                    // close magnifier
                    setShowMagnifier(false);
                }}
                alt="img"
            />

            <Box
                sx={{
                    display: showMagnifier ? '' : 'none',
                    position: 'absolute',
                    // prevent magnifier blocks the mousemove event of img
                    pointerEvents: 'none',
                    // set size of magnifier
                    height: `${magnifierHeight}px`,
                    width: `${magnifieWidth}px`,
                    // move element center to cursor pos
                    top: `${y - magnifierHeight / 2}px`,
                    left: `${x - magnifieWidth / 2}px`,
                    opacity: '1', // reduce opacity so you can verify position
                    border: '1px solid lightgray',
                    borderRadius: 300,
                    backgroundColor: 'white',
                    backgroundImage: `url('${src}')`,
                    backgroundRepeat: 'no-repeat',

                    // calculate zoomed image size
                    backgroundSize: `${imgWidth * zoomLevel}px ${
                        imgHeight * zoomLevel
                    }px`,

                    // calculate position of zoomed image.
                    backgroundPositionX: `${
                        -x * zoomLevel +
                        magnifieWidth / 2 +
                        backgroundOffsetPosX
                    }px`,
                    backgroundPositionY: `${
                        -y * zoomLevel +
                        magnifierHeight / 2 +
                        backgroundOffsetPosY
                    }px`
                }}
            />
        </>
    );
}
