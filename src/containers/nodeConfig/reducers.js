import {
    USE_CUSTOM_NODE_CHANGED,
    CUSTOM_NODE_CHANGED,
    NODE_SELECTED,
} from '../nodeConfig/constants';

const initialStatePublish = {
    nodeList: [
        "https://nodes.devnet.iota.org:443",
        "https://nodes.devnet.thetangle.org:443"
    ],
    selectedNode: null,
    useCustomNode: false,
    customNode: '',
};

// select initial node randomly from nodeList
initialStatePublish.selectedNode = initialStatePublish.nodeList[Math.floor(Math.random() * initialStatePublish.nodeList.length)];

export const nodeConfig = (state = initialStatePublish, action = {}) => {
    switch(action.type) {
        case USE_CUSTOM_NODE_CHANGED:
            return Object.assign({}, state, {useCustomNode: action.payload});
        case CUSTOM_NODE_CHANGED:
            return Object.assign({}, state, {customNode: action.payload});
        case NODE_SELECTED:
            return Object.assign({}, state, {selectedNode: action.payload});
        default:
            return state;
    }
};