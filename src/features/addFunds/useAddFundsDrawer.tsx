'use client';

import { useAppSelector } from 'libs/hooks/useAppSelector';
import { useAppDispatch } from 'libs/hooks/useAppDispatch';
import { addFundsDrawerActions } from 'state/addFundsDrawer/addFundsDrawerSlice';
import { getAddFundsDrawerState } from 'state/addFundsDrawer/selectors';

type StateLogic = {
    open: (content?: string) => void;
    close: () => void;
    opened: boolean;
};

export const useAddFundsDrawer = (): StateLogic => {
    const dispatch = useAppDispatch();

    const opened = useAppSelector(getAddFundsDrawerState);

    const open = (content?: string): void => {
        dispatch(addFundsDrawerActions.open(content));
    };

    const close = (): void => {
        dispatch(addFundsDrawerActions.close());
    };

    return { open, close, opened };
};
