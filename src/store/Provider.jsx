import Context from './Context';
import Reducer, { initState } from './Reducer';

import { useReducer } from 'react';

function Provider({ children }) {
    const [state, dispatch] = useReducer(Reducer, initState);

    return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
}

export default Provider;
