import fetch from 'isomorphic-fetch';
import * as actions from './action-types';
import config from '../config';
import moment from 'moment';
// import { generateCountryStats, generateUserStats } from '../lib/generateStats';

// ////////////////////////////////////////////////////////////////
//                           DISTRICTS                           //
// ////////////////////////////////////////////////////////////////

function requestDistricts () {
  return {
    type: actions.REQUEST_DISTRICTS
  };
}

function recieveDistricts (json) {
  return {
    type: actions.RECIEVE_DISTRICTS,
    json: json,
    receivedAt: Date.now()
  };
}

export function fetchDistricts (dateFrom, dateTo) {
  return (dispatch) => {
    dispatch(requestDistricts());
    let from_date = dateFrom || moment().subtract(10, 'days').format('YYYY-MM-DD')
    let to_date = dateTo || moment().format('YYYY-MM-DD')
    let url = `${config.api}/districts-u?date_from=${from_date}&date_to=${to_date}`;
    return fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        dispatch(recieveDistricts(json));
      });
  };
}

function requestUsers () {
  return {
    type: actions.REQUEST_USERS
  };
}

function recieveUsers (json) {
  return {
    type: actions.RECIEVE_USERS,
    json: json,
    receivedAt: Date.now()
  };
}

export function fetchUsers (dateFrom, dateTo) {
  return (dispatch) => {
    dispatch(requestUsers());
    let from_date = dateFrom || moment().subtract(10, 'days').format('YYYY-MM-DD')
    let to_date = dateTo || moment().format('YYYY-MM-DD')
    let url = `${config.api}/users?date_from=${from_date}&date_to=${to_date}`;
    return fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        dispatch(recieveUsers(json));
      });
  };
}


function requestEditors () {
  return {
    type: actions.REQUEST_EDITORS
  };
}

function recieveEditors (json) {
  return {
    type: actions.RECIEVE_EDITORS,
    json: json,
    receivedAt: Date.now()
  };
}

export function fetchEditors () {
  return (dispatch) => {
    dispatch(requestEditors());
    // let from_date = dateFrom || moment().subtract(10, 'days').format('YYYY-MM-DD')
    // let to_date = dateTo || moment().format('YYYY-MM-DD')
    // let url = `${config.api}/users?date_from=${from_date}&date_to=${to_date}`;
    let url = `${config.api}/editors`;
    return fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        dispatch(recieveEditors(json));
      });
  };
}
