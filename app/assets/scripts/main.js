'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { Router, Route, IndexRoute } from 'react-router';

import { browserHistory } from 'react-router';

import { syncHistoryWithStore } from 'react-router-redux';

import { createLogger } from 'redux-logger';
import reducer from './reducers/reducer';

import config from './config';
import App from './containers/App';

const initialState = {
}

const logger = createLogger({
  level: 'info',
  collapsed: true,
  predicate: (getState, action) => {
    return (config.environment !== 'production');
  }
});

// const finalCreateStore = compose(
//   applyMiddleware(logger, thunkMiddleware)
// )(createStore);

// const store = finalCreateStore(reducer);
const store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware, logger))

const history = syncHistoryWithStore(browserHistory, store)

render((
    <Provider store={store} >
      <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={App}  />
      </Route>
        
      </Router>
    </Provider>
), document.querySelector('.app'));
