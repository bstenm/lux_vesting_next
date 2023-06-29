import { RootState } from '@/redux/store';

export const getAddFundsDrawerState = (state: RootState): boolean =>
    state.addFundsDrawer.opened;
