import { path } from 'config/path';
import { useWeb3 } from 'features/authButton/useWeb3';
import { MenuPopover, MenuPopoverItem } from 'components/MenuPopover';
import { SITE_URL } from 'config/constants';

type Props = {
    anchorEl: HTMLButtonElement | null;
    handleClose: () => void;
};

export function UserMenu({ anchorEl, handleClose }: Props): JSX.Element {
    const { logout } = useWeb3();

    const sendMailUrl = `${SITE_URL}/${path.sendEmail}`;

    const sendEmail = async (): Promise<void> => {
        try {
            await fetch(sendMailUrl, {
                method: 'POST',
                body: JSON.stringify({
                    to: 'bstenm@hotmail.com',
                    subject: 'Lux Vesting New Listing'
                }),
                headers: { 'Content-Type': 'application/json' },
                mode: 'no-cors' // disable cors
            });
            alert('Message sent');
        } catch (error) {
            console.log(error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <MenuPopover
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorEl={anchorEl}>
            <MenuPopoverItem onClick={sendEmail}>My activity</MenuPopoverItem>
            <MenuPopoverItem onClick={logout}>Logout</MenuPopoverItem>
        </MenuPopover>
    );
}
