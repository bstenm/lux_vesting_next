import { Html } from '@react-email/html';
import { Button } from '@react-email/button';

type Props = {
    url: string;
};

export function Email({ url }: Props): JSX.Element {
    return (
        <Html lang="en">
            <Button href={url}>Click me</Button>
        </Html>
    );
}
