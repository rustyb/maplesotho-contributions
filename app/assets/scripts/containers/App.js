'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Visualization from '../components/Visualization';
import Summary from '../components/Summary';
import {
  fetchDistricts,
  fetchUsers
} from '../actions/action-creators';
class App extends Component {
  componentDidMount () {
    this.props._fetchDistricts();
    this.props._fetchUsers();
  }
  render () {
    const showVisualizationSuggestor = () => {
      if (this.props.districtsFetched && this.props.usersFetched) {
        return (
          <Visualization className='Visualization' location={this.props.location}/>
          );
      }
    };

    const showSum = () => {
        if (this.props.districtsFetched && this.props.usersFetched ) {
          return (<Summary />)
        }
    };
    return (
      <div className="App">
        <div className="Selector">
          {showSum()}
        </div>
        <div className="main">
          {showVisualizationSuggestor()}
        </div>
      </div>
    );
  }
}

const selector = (state) => {
  return {
    districtsFetched: state.maplesothoDistricts.fetched,
    usersFetched: state.maplesothoUsers.fetched,
  };
};

const dispatcher = (dispatch) => {
  return {
    _fetchDistricts: (dateFrom) => dispatch(fetchDistricts(dateFrom)),
    _fetchUsers: (dateFrom) => dispatch(fetchUsers(dateFrom))
  };
};

export default connect(selector, dispatcher)(App);
