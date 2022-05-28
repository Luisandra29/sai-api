import * as React from 'react';
import {
    Tooltip,
    IconButton,
    styled
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useSidebarState, useSidebarDispatch } from '../hooks/useSidebar'

const CustomIconButton = styled(IconButton)(({ theme }) => ({
    color: `${theme.palette.primary.main} !important`,
    marginLeft: '0.5rem'
}));

const ToggleSidebarButton = () => {
    const open = useSidebarState()
    const { toggleSidebar } = useSidebarDispatch()

    return (
        <Tooltip
            title={open ? 'Cerrar menú' : 'Abrir menú'}
            enterDelay={500}
        >
            <CustomIconButton onClick={toggleSidebar}>
                <MenuIcon />
            </CustomIconButton>
        </Tooltip>
    );
};

export default ToggleSidebarButton;
