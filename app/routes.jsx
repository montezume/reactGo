import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { fetchDateData } from './fetch-data';
import { App, Landing } from './pages';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const onboarding = (nextState, replace, callback) => {
    const state = store.getState();
    // console.log('here', state);
    callback();
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute onEnter={onboarding} component={Landing} />
    </Route>
  );
};
