import * as Mam from "@iota/mam";
import * as Converter from "@iota/converter";
import {localAttachToTangle} from '../../iota/localAttachToTangle';
import {
PUBLISH_FAIL,
PUBLISH_PENDING,
PUBLISH_SUCCESS,
SET_PUBLISH_DESCRIPTION,
SET_PUBLISH_MAGNET_LINK
} from "./constants";


export const performPublish = () => (dispatch, getState) => {

    dispatch({type: PUBLISH_PENDING});

    const {publish, nodeConfig} = getState();

    const mamMessageObject = {
        m: publish.magnetLink,
        d: publish.description,
        t: (new Date()).valueOf()
    };

    // set the current iota node URL as provider
    Mam.init({
        provider: nodeConfig.useCustomNode ? nodeConfig.customNode : nodeConfig.selectedNode,
        attachToTangle: localAttachToTangle
    });

    const message = Mam.create(publish.mamState, Converter.asciiToTrytes(JSON.stringify(mamMessageObject)));

    Mam.attach(message.payload, message.address, 3, 9)
        .then(() => {
            dispatch({type: PUBLISH_SUCCESS, payload: message})
        })
        .catch(err => {
            dispatch({type: PUBLISH_FAIL, payload: err})
        });
};

export const setPublishDescription = (text) => ({
    type: SET_PUBLISH_DESCRIPTION,
    payload: text
});

export const setPublishMagnetLink = (text) => ({
    type: SET_PUBLISH_MAGNET_LINK,
    payload: text
});