import { Menu } from '@/state/menu/menuSlice';
import { RootState } from '@/redux/store';

export const getMenuState = (state: RootState): Menu => state.menu;
