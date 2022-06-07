import * as React from 'react';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom'
import { useSidebarState } from '../hooks/useSidebar'

const Menu = ({ children }) => {
    const open = useSidebarState()

    return (
        <Box mt={1} textAlign="left" padding={open && "0 1rem"}>
            <Box width="80%" height="2rem" margin="1rem">
                {(true) && (
                    <Link to='/'>
                        <img
                            src={`${process.env.PUBLIC_URL}/logotipo_white.png`} alt='approbado_logotipo'
                            height="100%"
                            width="100%"
                        />
                    </Link>
                )}
            </Box>
            {React.Children.map(children, (menuItem) =>
                React.cloneElement(menuItem, {
                    open: open,
                })
            )}
        </Box>
    );
};

export default Menu;
