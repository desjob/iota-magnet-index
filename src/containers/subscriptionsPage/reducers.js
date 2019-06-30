import FlexSearch from "flexsearch";

import {
    SET_SUBSCRIPTION_ADDRESS,
    UPDATE_INDEX_PENDING,
    UPDATE_INDEX_SUCCESS,
    UPDATE_INDEX_FAIL
} from "./constants";

var index = new FlexSearch({
    encode: "balance",
    tokenize: "strict",
    threshold: 0,
    resolution: 3,
    depth: 4,
    async: true,
    doc: {
        id: "id",
        field: [
            "title",
            "date"
        ]
    }
});

var doc1 = {
    id: 1,
    title: "Game of Thrones season 1 episode 3",
    url: "magnet:?xt=bla",
    date: new Date("2019-06-05 00:00:00")
}

var doc2 = {
    id: 2,
    title: "Game of Thrones season 8 ep 5",
    url: "magnet:?xt=blb",
    date: new Date("2019-05-29 00:00:00")

}

var doc3 = {
    id: 3,
    title: "Game of Thrones season 8 episode 5",
    url: "magnet:?xt=bla",
    date: new Date("2019-05-30 00:00:00")

}

var doc4 = {
    id: 3,
    title: "Game of Thrones season 99 episode 99",
    url: "magnet:?xt=b99la",
    date: new Date("2019-05-30 00:00:00")

}

index.add([doc1, doc2, doc3, doc4]);

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