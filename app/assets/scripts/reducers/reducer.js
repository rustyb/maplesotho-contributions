import React from 'react';
import { combineReducers } from 'redux';
import * as actions from '../actions/action-types';
import { cloneDeep, includes } from 'lodash';

// ////////////////////////////////////////////////////////////////
//                         API-DATA                              //
// ////////////////////////////////////////////////////////////////

const maplesothoDistricts = (state = {districts: [], fetching: false, fetched: false}, action) => {
  switch (action.type) {
    case actions.REQUEST_DISTRICTS:
      state = cloneDeep(state);
      state.fetching = true;
      break;
    case actions.RECIEVE_DISTRICTS:
      state = cloneDeep(state);
      state.districts = action.json;
      state.fetching = false;
      state.fetched = true;
      break;
  }
  return state;
};

export default combineReducers({
 maplesothoDistricts
});
