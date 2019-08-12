export const searchMockResolve = jest.fn().mockImplementation(() => {
    return new Promise((resolve) => {
        resolve([]);
    });
});

export const searchMockReject = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
        reject('Search failed');
    });
});

export const searchMockForDates = jest.fn().mockImplementation((searchObject) => {
    expect(typeof searchObject.where).toEqual('function');
    searchObject.where({ date: new Date().valueOf });
    return new Promise((resolve) => {
        resolve([]);
    });
});