import {
    USE_CUSTOM_NODE_CHANGED
} from "./constants";

export const setUseCustomNode = (checked) => ({
    type: USE_CUSTOM_NODE_CHANGED,
    payload: checked
});
