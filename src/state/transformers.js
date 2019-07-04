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

        return { ...outboundState, index: index};
    },

    // define which reducers this transform gets called for.
    { whitelist: ['subscriptions'] }
);

export const searchCriteriaDatesTransform = createTransform(

    // when saving to localStorage, transform the fromDate and untilDate to a timestamp
    (inboundState, key) => {

        if (typeof inboundState.dateFrom === 'object' && inboundState.dateFrom !== null) {
            inboundState.dateFrom = inboundState.dateFrom.valueOf();
        }

        if (typeof inboundState.dateUntil === 'object' && inboundState.dateUntil !== null) {
            inboundState.dateUntil = inboundState.dateUntil.valueOf();
        }

        return inboundState;
    },

    // when loading from localStorage, turn the timestamps back into date objects
    (outboundState, key) => {

        if (outboundState.dateFrom !== null) {
            outboundState.dateFrom = new Date(outboundState.dateFrom);
        }

        if (outboundState.dateUntil !== null) {
            outboundState.dateUntil = new Date(outboundState.dateUntil);
        }

        return outboundState;
    },

    // define which reducers this transform gets called for.
    { whitelist: ['searchCriteria'] }
);