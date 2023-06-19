import '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {
        filter: {
            color: string;
            border: string;
            bgcolor: string;
            fontSize: number;
            borderHover: string;
            borderRadius: number;
        };
    }

    interface ThemeOptions {
        filter?: {
            color?: string;
            border?: string;
            bgcolor?: string;
            fontSize?: number;
            borderHover?: string;
            borderRadius?: number;
        };
    }
}
