import {
    PUBLISH_FAIL,
    PUBLISH_PENDING,
    PUBLISH_SUCCESS,
    SET_PUBLISH_DESCRIPTION,
    SET_PUBLISH_MAGNET_LINK
} from "./constants";

const initialStatePublish = {
    isPending: false,
    originalRoot: null,
    mamState: null,
    count: 0,
    error: '',
    description: '',
    magnetLink: '',
};

export const publish = (state = initialStatePublish, action = {}) => {
    switch(action.type) {
        case SET_PUBLISH_MAGNET_LINK:
            return Object.assign({}, state, {magnetLink: action.payload});
        case SET_PUBLISH_DESCRIPTION:
            return Object.assign({}, state, {description: action.payload});
        case PUBLISH_PENDING:
            return Object.assign({}, state, {isPending: true});
        case PUBLISH_SUCCESS:
            const originalRoot = state.originalRoot ? state.originalRoot : action.payload.root;
            return Object.assign({}, state, {originalRoot: originalRoot, count: action.payload.state.channel.start, mamState: action.payload.state, description: '', magnetLink: '', isPending: false});
        case PUBLISH_FAIL:
            return Object.assign({}, state, {error: action.payload, isPending: false});
        default:
            return state;
    }
};