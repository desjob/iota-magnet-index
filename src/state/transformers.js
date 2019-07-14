import { createTransform } from 'redux-persist';
import {createSearchIndex} from "../containers/subscriptionsPage/reducers";
// import FlexSearch from "flexsearch";
// import v from "flexsearch";

export const searchIndexTransform = createTransform(

    // when saving to storage, only save the document from the search index
    (inboundState, key) => {

        const documents = inboundState.index.where(() => true);

        return { ...inboundState, index: documents };
    },

    // when loading from storage, turn the documents back into a usable search index
    (outboundState, key) => {

        var index = createSearchIndex();
        index.add(outboundState.index);

        return { ...outboundState, index: index};
    },

    // define which reducers this transform gets called for.
    { whitelist: ['subscriptions'] }
);
