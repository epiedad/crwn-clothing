import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

const store = configureStore(rootReducer, applyMiddleware(...middlewares));

export default store;