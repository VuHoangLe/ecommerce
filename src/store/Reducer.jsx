const initState = {
    initFilter: {
        category: [],
        color: [],
        size: [],
    },
};

function Reducer(state, action) {
    switch (action.type) {
        case 'aa':
            state.initFilter();
            break;
        default:
            throw console.error();
    }
}

export { initState };
export default Reducer;
