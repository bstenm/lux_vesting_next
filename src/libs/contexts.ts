import { createContext } from 'react';

import { defaultLng } from '@/config';

export type LangContextType = [string, (value: string) => void];

export const LangContext = createContext<LangContextType>([
    defaultLng,
    () => null
]);
