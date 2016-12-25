import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createRoutes from 'routes';
import * as types from 'types';
import configureStore from 'store/configureStore';
import preRenderMiddleware from 'middlewares/preRenderMiddleware';

// Grab the state from a global injected into
// server-generated HTML
const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);

/**
 * Callback function handling frontend route changes.
 */
function onUpdate() {
  // Prevent duplicate fetches when first loaded.
  // Explanation: On server-side render, we already have __INITIAL_STATE__
  // So when the client side onUpdate kicks in, we do not need to fetch twice.
  // We set it to null so that every subsequent client-side navigation will
  // still trigger a fetch data.
  // Read more: https://github.com/choonkending/react-webpack-node/pull/203#discussion_r60839356
  if (window.__INITIAL_STATE__ !== null) {
    window.__INITIAL_STATE__ = null;
    return;
  }

  store.dispatch({ type: types.FETCH_DATA_REQUEST });
  preRenderMiddleware(store.dispatch, this.state)
  .then(data => {
    data.forEach(returningCall => {
      store.dispatch({ type: returningCall.type, data: returningCall.data});
    });
    return store.dispatch({ type: types.FETCH_DATA_SUCCESS, data });
  })
  .catch(error => {
    return store.dispatch({ type: types.FETCH_DATA_FAILURE, data: error});
  });
}

// Router converts <Route> element hierarchy to a route config:
// Read more https://github.com/rackt/react-router/blob/latest/docs/Glossary.md#routeconfig
function renderApp() {
  render(
    <Provider store={store}>
      <Router history={history} onUpdate={onUpdate}>
        {routes}
      </Router>
    </Provider>, document.getElementById('app'));
}

if (!window.Intl) {
  require.ensure([
    'intl',
    'intl/locale-data/jsonp/en',
    'intl/locale-data/jsonp/fr'
  ], (require) => {
    require('intl');
    require('intl/locale-data/jsonp/en');
    require('intl/locale-data/jsonp/fr');

    renderApp();
  });
} else {
  renderApp();
}
