import { Html } from '@react-email/html';
import { Button } from '@react-email/button';

type Props = {
    link: string;
};

export function EmailTestButton({ link }: Props): JSX.Element {
    return (
        <Html lang="en">
            <Button href={link}>Click me</Button>
        </Html>
    );
}
