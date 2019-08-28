import React from 'react';
import { mount } from 'enzyme';

import TorrentSearch from '../torrentSearch';

describe("Validate TorrentSearch", () => {
    const searchProps = {
        searchQuery: '',
        limit: 100,
        dateFrom: null,
        dateUntil: null,
        dateFilterValue: "",
        isDialogOpen: false,
        dialogDateFrom: null,
        dialogDateUntil: null,
    };

    const comp = mount(<TorrentSearch {...searchProps} />);

    it("Should render the searchfield, limit filter and date filter", () => {
        expect(comp.find("input").length).toEqual(3);
    });

    it("Should render the search and filter reset buttons", () => {
        expect(comp.find("button").length).toEqual(2);
    });
});
