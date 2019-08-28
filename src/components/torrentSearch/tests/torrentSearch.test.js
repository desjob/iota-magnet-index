import React from 'react';
import { mount } from 'enzyme';

import TorrentSearch from '../torrentSearch';

describe("Validate TorrentSearch", () => {
    const searchProps = {
        searchQuery: 'test',
        limit: 100,
        dateFrom: null,
        dateUntil: null,
        dateFilterValue: "",
        isDialogOpen: false,
        dialogDateFrom: null,
        dialogDateUntil: null,
    };

    let comp;
    beforeEach(() => {
        comp = mount(<TorrentSearch {...searchProps} />);
    });

    it("Should render the searchfield, limit filter and date filter", () => {
        expect(comp.find("input").length).toEqual(3);
    });

    it("Should render the search and filter reset buttons", () => {
        expect(comp.find("button").length).toEqual(2);
    });

    it("Should show the searchquery in the searchfield", () => {
        expect(
            comp.find("input[type='search'][value='test']")
                .length
        ).toEqual(1);
    });

    it("Should show the limit in the limit filter", () => {
        expect(
            comp.find("input[id='limit'][value=100]")
                .length
        ).toEqual(1);
    });
});
