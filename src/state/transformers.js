import { createTransform } from 'redux-persist';

import {createSearchIndex} from "../containers/subscriptionsPage/reducers";

export const searchIndexTransform = createTransform(

    // when saving to localStorage, only save the document from the search index
    (inboundState, key) => {

        const documents = inboundState.index.where(() => true);

        return { ...inboundState, index: documents };
    },

    // when loading from localStorage, turn the documents back into a usable search index
    (outboundState, key) => {

        var index = createSearchIndex();
        index.add(outboundState.index);

        return { ...outboundState, index: index, foo: 'bar' };
    },

    // define which reducers this transform gets called for.
    { whitelist: ['subscriptions'] }
);