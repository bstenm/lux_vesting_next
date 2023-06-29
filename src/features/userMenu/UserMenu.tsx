import { useWeb3 } from 'features/authButton/useWeb3';
import { MenuPopover, MenuPopoverItem } from 'components/MenuPopover';

type Props = {
    anchorEl: HTMLButtonElement | null;
    handleClose: () => void;
};

export function UserMenu({ anchorEl, handleClose }: Props): JSX.Element {
    const { logout } = useWeb3();

    return (
        <MenuPopover
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorEl={anchorEl}>
            <MenuPopoverItem>My activity</MenuPopoverItem>
            <MenuPopoverItem onClick={logout}>Logout</MenuPopoverItem>
        </MenuPopover>
    );
}
