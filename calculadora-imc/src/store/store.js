import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { GET_RESULTS, POST_RESULT, SET_STATE } from '../constants/actionsStrings';

const INITIAL_STATE = {
    result: {},
    results: [],
}

const enhancer = compose(applyMiddleware(thunk));
const state = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_STATE:
			return action.payload;
        case POST_RESULT:
            return { ...state, result: action.payload };
        case GET_RESULTS: 
            return { ...state, results: action.payload };
		default:
			return { ...state };
	}
};

const store = createStore(state, enhancer);
export { store };