import {
    USE_CUSTOM_NODE_CHANGED,
    CUSTOM_NODE_CHANGED,
    NODE_SELECTED
} from "./constants";

export const setUseCustomNode = (checked) => ({
    type: USE_CUSTOM_NODE_CHANGED,
    payload: checked
});

export const setCustomNode = (customNode) => ({
    type: CUSTOM_NODE_CHANGED,
    payload: customNode
});

export const selectNode = (selectedNode) => ({
    type: NODE_SELECTED,
    payload: selectedNode
});
