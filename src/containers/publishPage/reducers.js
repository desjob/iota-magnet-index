import * as Mam from '@iota/mam';
import curlTransaction from "curl-transaction-core";
import curlImpl from "curl-transaction-webgl2-impl";
import {
    PUBLISH_FAIL,
    PUBLISH_PENDING,
    PUBLISH_SUCCESS,
    SET_PUBLISH_DESCRIPTION,
    SET_PUBLISH_MAGNET_LINK
} from "./constants";

import {
    USE_CUSTOM_NODE_CHANGED
} from '../nodeConfig/constants';

const curl = curlTransaction({ curlImpl });
const localAttachToTangle = async function(trunkTransaction, branchTransaction, minWeightMagnitude, trytesArray) {

    return await curl.curl({
        trunkTransaction,
        branchTransaction,
        minWeightMagnitude,
        trytesArray
    }).then((processedTrytes) => {
        return processedTrytes
    }).catch((error) => {
        throw error;
    });
};

const mamConfig = {
    provider: "https://nodes.devnet.iota.org:443",
    attachToTangle: localAttachToTangle
};

const mamState = Mam.init(mamConfig);

const intialStatePublish = {
    isPending: false,
    originalRoot: null,
    mamState: mamState,
    mamConfig: mamConfig,
    count: 0,
    error: '',
    description: '',
    magnetLink: '',
    nodeList: [
        "https://nodes.devnet.iota.org:443",
        "https://nodes.devnet.thetangle.org:443"
    ],
    useCustomNode: false
};

export const publish = (state = intialStatePublish, action = {}) => {
    switch(action.type) {
        case USE_CUSTOM_NODE_CHANGED:
            return Object.assign({}, state, {useCustomNode: action.payload});

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
}