import { RootState } from '@/redux/store';

export const getUserBidsDrawerState = (state: RootState): boolean =>
    state.userBidsDrawer.opened;
