import { useTranslation } from 'react-i18next';

export const useTranslate = (): ((
    textId?: string,
    vars?: Record<string, unknown>
) => string) => {
    const { t } = useTranslation();

    return (textId, vars) => t(textId || '', vars || {}) ?? '';
};
