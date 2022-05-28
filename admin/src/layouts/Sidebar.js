import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Drawer, useMediaQuery } from '@material-ui/core';
import lodashGet from 'lodash/get';
import { useSidebarState, useSidebarDispatch } from '../hooks/useSidebar'

const Sidebar = props => {
    const { children, closedSize, size, ...rest } = props;
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    );
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('md'));
    const open = useSidebarState()
    const { toggleSidebar } = useSidebarDispatch();

    return isXSmall ? (
        <StyledDrawer
            variant="temporary"
            open={open}
            onClose={toggleSidebar}
            classes={SidebarClasses}
            {...rest}
        >
            {children}
        </StyledDrawer>
    ) : isSmall ? (
        <StyledDrawer
            variant="permanent"
            open={open}
            onClose={toggleSidebar}
            classes={SidebarClasses}
            {...rest}
        >
            <div className={SidebarClasses.fixed}>{children}</div>
        </StyledDrawer>
    ) : (
        <StyledDrawer
            variant="permanent"
            open={open}
            onClose={toggleSidebar}
            classes={SidebarClasses}
            {...rest}
        >
            <div className={SidebarClasses.fixed}>{children}</div>
        </StyledDrawer>
    );
};

Sidebar.propTypes = {
    children: PropTypes.node.isRequired,
};

const PREFIX = 'RaSidebar';

export const SidebarClasses = {
    docked: `${PREFIX}-docked`,
    paper: `${PREFIX}-paper`,
    paperAnchorLeft: `${PREFIX}-paperAnchorLeft`,
    paperAnchorRight: `${PREFIX}-paperAnchorRight`,
    paperAnchorTop: `${PREFIX}-paperAnchorTop`,
    paperAnchorBottom: `${PREFIX}-paperAnchorBottom`,
    paperAnchorDockedLeft: `${PREFIX}-paperAnchorDockedLeft`,
    paperAnchorDockedTop: `${PREFIX}-paperAnchorDockedTop`,
    paperAnchorDockedRight: `${PREFIX}-paperAnchorDockedRight`,
    paperAnchorDockedBottom: `${PREFIX}-paperAnchorDockedBottom`,
    modal: `${PREFIX}-modal`,
    fixed: `${PREFIX}-fixed`,
};

const StyledDrawer = styled(Drawer, {
    name: PREFIX,
    slot: 'Root',
    overridesResolver: (props, styles) => styles.root,
})(({ open, theme }) => ({
    height: 'calc(100vh - 3em)',

    [`& .${SidebarClasses.docked}`]: {},
    [`& .${SidebarClasses.paper}`]: {},
    [`& .${SidebarClasses.paperAnchorLeft}`]: {},
    [`& .${SidebarClasses.paperAnchorRight}`]: {},
    [`& .${SidebarClasses.paperAnchorTop}`]: {},
    [`& .${SidebarClasses.paperAnchorBottom}`]: {},
    [`& .${SidebarClasses.paperAnchorDockedLeft}`]: {},
    [`& .${SidebarClasses.paperAnchorDockedTop}`]: {},
    [`& .${SidebarClasses.paperAnchorDockedRight}`]: {},
    [`& .${SidebarClasses.paperAnchorDockedBottom}`]: {},
    [`& .${SidebarClasses.modal}`]: {},

    [`& .${SidebarClasses.fixed}`]: {
        position: 'fixed',
        height: 'calc(100vh - 3em)',
        overflowX: 'hidden',
        // hide scrollbar
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },

    [`& .MuiPaper-root`]: {
        position: 'relative',
        width: open
            ? lodashGet(theme, 'sidebar.width', DRAWER_WIDTH)
            : lodashGet(theme, 'sidebar.closedWidth', CLOSED_DRAWER_WIDTH),
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: 'transparent',
        borderRight: 'none',
        [theme.breakpoints.only('xs')]: {
            marginTop: 0,
            height: '100vh',
            position: 'inherit',
            backgroundColor: theme.palette.background.default,
        },
        [theme.breakpoints.up('md')]: {
            border: 'none',
        },
        zIndex: 'inherit',
    },
}));

const DRAWER_WIDTH = 240;
const CLOSED_DRAWER_WIDTH = 55;

export default Sidebar;
