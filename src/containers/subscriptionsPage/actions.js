import * as Mam from "@iota/mam";
import * as Converter from "@iota/converter";

import {setMamProvider} from "../../iota/mamProvider";
import {
    SET_SUBSCRIPTION_ADDRESS,
    UPDATE_INDEX_PENDING,
    UPDATE_INDEX_SUCCESS,
    UPDATE_INDEX_FAIL
} from "./constants";

export const performUpdateIndex = () => (dispatch, getState) => {

    dispatch({type: UPDATE_INDEX_PENDING});

    const {subscriptions, nodeConfig} = getState();

    setMamProvider( nodeConfig.useCustomNode ? nodeConfig.customNode : nodeConfig.selectedNode);

    const docs = [];

    const makeid = (length) => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXY   ...---Zabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    var t0 = performance.now();

    const currentTimestampMs = new Date().valueOf();

    for(var i=0; i < 50000; i++) {

        var id = makeid(25);

        docs.push({
            id: id,
            title: id,
            url: id,
            all: '1',
            date: currentTimestampMs - (i * 1000),
            negativeDate: -(currentTimestampMs - (i * 1000))
        });
    }

    var t1 = performance.now();

    console.log("generating fake docs took " + (t1 - t0) + " milliseconds.");

    subscriptions.index.add(docs);

    subscriptions.index.add(makeid(20), 'trigger mycallback pls', () => {

        dispatch({type: UPDATE_INDEX_SUCCESS, payload: docs});
    });





    // Mam.fetch(subscriptions.address, 'public', null)
    //     .then(result => {
    //         if(typeof result.messages === 'undefined') {
    //
    //             dispatch({type: UPDATE_INDEX_FAIL, payload: 'something went wrong'});
    //             return;
    //         }
    //
    //         result.messages.forEach(message => {
    //
    //             message = JSON.parse(Converter.trytesToAscii(message));
    //
    //             if (typeof message === 'object' && message !== null && message.m && message.d && message.t) {
    //                 var doc = {
    //                     id: message.m,
    //                     title: message.d,
    //                     url: message.m,
    //                     date: message.t,
    //                     negativeDate: -message.t,
    //                     all: '1'
    //                 }
    //                 docs.push(doc);
    //             }
    //
    //         });
    //
    //         dispatch({type: UPDATE_INDEX_SUCCESS, payload: docs});
    //
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         dispatch({type: UPDATE_INDEX_FAIL, payload: []});
    //     });

};

export const setSubscriptionAddress= (address) => ({
    type: SET_SUBSCRIPTION_ADDRESS,
    payload: address
});
