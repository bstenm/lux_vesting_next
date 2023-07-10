import { App } from '@/app/App';
import { siteTitle, siteDescription } from '@/config';
import './globals.css';

type Props = {
    children: React.ReactNode;
};

export const metadata = {
    title: siteTitle,
    description: siteDescription
};

function RootLayout({ children }: Props): JSX.Element {
    return (
        <html lang="en">
            <body>
                <App>{children}</App>
            </body>
        </html>
    );
}

export default RootLayout;
