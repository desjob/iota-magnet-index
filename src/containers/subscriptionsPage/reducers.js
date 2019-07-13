import FlexSearch from "flexsearch";

import {
    SET_SUBSCRIPTION_ADDRESS,
    UPDATE_INDEX_PENDING,
    UPDATE_INDEX_SUCCESS,
    UPDATE_INDEX_FAIL
} from "./constants";

export const createSearchIndex = () => {
    return new FlexSearch({
        encode: "balance",
        tokenize: "forward",
        threshold: 0,
        resolution: 3,
        depth: 4,
        // profile: 'speed',
        async: true,
        doc: {
            id: "id",
            field: [
                "title",
                "date",
                "all"
            ]
        }
    });
}

var index = createSearchIndex();

const currentTimestampMs = new Date().valueOf();

var doc0 = {
    id: 0,
    title: "Game of Thrones season 8 complete",
    url: "magnet:?xt=bla1",
    all: '1', // used for finding all results through search
    date: (currentTimestampMs - (1 * 1000)), // 1 second ago
    negativeDate: -((currentTimestampMs - (1 * 1000))), //used for sorting
}

var doc1 = {
    id: 1,
    title: "Game of Thrones season 8 recap",
    url: "magnet:?xt=bla1",
    all: '1',
    date: (currentTimestampMs - (3600 * 1000)), // 1 hour ago
    negativeDate: -((currentTimestampMs - (3600 * 1000))),
}

var doc2 = {
    id: 2,
    title: "Game of Thrones season 8 episode 6",
    url: "magnet:?xt=bla1",
    all: '1',
    date: (currentTimestampMs - (3600 * 24 * 1000)), // 1 day ago
    negativeDate: -(currentTimestampMs - (3600 * 24 * 1000))
}

var doc3 = {
    id: 3,
    title: "Game of Thrones season 8 ep 5",
    url: "magnet:?xt=bla2",
    all: '1',
    date: (currentTimestampMs - (3600 * 24 * 7 * 1000)), // 1 week ago
    negativeDate: -(currentTimestampMs - (3600 * 24 * 7 * 1000))
}

var doc4 = {
    id: 4,
    title: "Game of Thrones season 8 episode 2",
    url: "magnet:?xt=bla3",
    all: '1',
    date: (currentTimestampMs - ((3600 * 24 * 7 * 52 * 1000) / 12)), // 1 month ago
    negativeDate: -(currentTimestampMs - ((3600 * 24 * 7 * 52 * 1000) / 12))
}

var doc5 = {
    id: 5,
    title: "Game of Thrones season 7 episode 6",
    url: "magnet:?xt=bla4",
    all: '1',
    date: (currentTimestampMs - ((3600 * 24 * 7 * 52 * 1000))), // 1 year ago
    negativeDate: -(currentTimestampMs - (3600 * 24 * 7 * 52 * 1000))
}

index.add([doc0, doc1, doc2, doc3, doc4, doc5]);

/*
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXY   ...---Zabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

var docs = [];

for(var i=0; i < 100000; i++) {

    var id = makeid(10);

    docs.push({
        id: i,
        title: id,
        url: id,
        all: '1',
        date: currentTimestampMs - (i * 1000),
        negativeDate: -(currentTimestampMs - (i * 1000))
    });
}

index.add(docs);
*/



const intialStateSubscriptions = {
    isPending: false,
    error: '',
    address: '',
    index: index
};

export const subscriptions = (state = intialStateSubscriptions, action = {}) => {
    switch (action.type) {
        case SET_SUBSCRIPTION_ADDRESS:
            return Object.assign({}, state, {address: action.payload});
        case UPDATE_INDEX_PENDING:
            return Object.assign({}, state, {isPending: true});
        case UPDATE_INDEX_SUCCESS:
            let updatedIndex = Object.assign( Object.create( Object.getPrototypeOf(state.index)), state.index);
            updatedIndex.add(action.payload);
            return Object.assign({}, state, {index: updatedIndex, isPending: false});
        case UPDATE_INDEX_FAIL:
            return Object.assign({}, state, {error: action.payload, isPending: false});
        default:
            return state;
    }
}