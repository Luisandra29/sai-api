import { useDispatch, useSelector } from 'react-redux';
import { TOGGLE_SIDEBAR } from '../actions';

export const useSidebarState = () => {
    const store = useSelector(state => state);

    return store.sidebar.isOpen;
};

export const useSidebarDispatch = name => {
    const dispatch = useDispatch();

    return {
        toggleSidebar: () => dispatch({
            type: TOGGLE_SIDEBAR
        })
    }
}
