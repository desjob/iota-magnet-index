import { createTransform } from 'redux-persist';
import {createSearchIndex} from "../containers/subscriptionsPage/reducers";
import FlexSearch from "flexsearch";
import v from "flexsearch";

export const searchIndexTransform = createTransform(

    // when saving to localStorage, only save the document from the search index
    (inboundState, key) => {

        // console.log(inboundState.index);

        var t0 = performance.now();

        const exportableIndex1 = JSON.parse(JSON.stringify(inboundState.index));

        // const exportableIndex = Object.assign({}, inboundState.index);
        //
        // delete exportableIndex.w;
        //
        // exportableIndex.a.index.all = Object.assign({}, exportableIndex.a.index.all);
        // exportableIndex.a.index.date = Object.assign({}, exportableIndex.a.index.date);
        // exportableIndex.a.index.title = Object.assign({}, exportableIndex.a.index.title);
        //
        // delete exportableIndex.a.index.all.w;
        // delete exportableIndex.a.index.date.w;
        // delete exportableIndex.a.index.title.w;
        //
        // console.log(exportableIndex);

        var t1 = performance.now();

        console.log("exporting the index took " + (t1 - t0) + " milliseconds.");


        return { ...inboundState, index: exportableIndex1 };
    },

    // when loading from localStorage, turn the documents back into a usable search index
    (outboundState, key) => {

        var index = outboundState.index;

        var t0 = performance.now();

        //re-create index class instances
        Object.setPrototypeOf(index, v.prototype);
        Object.setPrototypeOf(index.a.index.all, v.prototype);
        Object.setPrototypeOf(index.a.index.date, v.prototype);
        Object.setPrototypeOf(index.a.index.title, v.prototype);

        var t1 = performance.now();


        console.log("importing the index took " + (t1 - t0) + " milliseconds.");

        const search = {
            field: "title",
            query: 'fo',
            suggest: true,
            limit: 10,
            sort: "negativeDate" // created an issue to find a better way to do this: https://github.com/nextapps-de/flexsearch/issues/103
        };

        index.search(search).then(console.log);



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