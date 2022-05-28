import { TOGGLE_SIDEBAR } from '../actions';

const initialState = {
    isOpen: false
}

const sidebarReducer = (
    previousState = initialState,
    action
) => {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return {
                isOpen: !previousState.isOpen
            }
        default:
            return previousState;
    }
}

export default sidebarReducer;

