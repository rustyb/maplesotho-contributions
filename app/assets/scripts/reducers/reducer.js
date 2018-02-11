import React from 'react';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
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

const maplesothoUsers = (state = {users: [], fetching: false, fetched: false}, action) => {
  switch (action.type) {
    case actions.REQUEST_USERS:
      state = cloneDeep(state);
      state.fetching = true;
      break;
    case actions.RECIEVE_USERS:
      state = cloneDeep(state);
      state.users = action.json;
      state.fetching = false;
      state.fetched = true;
      break;
  }
  return state;
};

const maplesothoEditors = (state = {editors: [], fetching: false, fetched: false}, action) => {
  switch (action.type) {
    case actions.REQUEST_EDITORS:
      state = cloneDeep(state);
      state.fetching = true;
      break;
    case actions.RECIEVE_EDITORS:
      state = cloneDeep(state);
      state.editors = action.json;
      state.fetching = false;
      state.fetched = true;
      break;
  }
  return state;
};

export const reducers = {
  maplesothoDistricts,
   maplesothoUsers,
   maplesothoEditors
}

export default combineReducers(Object.assign({}, reducers, {
  routing: routerReducer
}))
