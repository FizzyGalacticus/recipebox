import {applyMiddleware, createStore} from 'redux';
import {production} from 'config';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from 'redux/reducers';


const middlewareArray = [thunk];

if(!production)
	middlewareArray.push(logger);

const middleware = applyMiddleware(...middlewareArray);

const store = createStore(reducers, middleware);

export const dispatch = store.dispatch;

export const getState = store.getState;

export default store;
