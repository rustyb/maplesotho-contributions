'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Visualization from '../components/Visualization';
import Summary from '../components/Summary';
import {
  fetchDistricts
} from '../actions/action-creators';
class App extends Component {
  componentDidMount () {
    this.props._fetchDistricts();
  }
  render () {
    const showVisualizationSuggestor = () => {
      if (this.props.districtsFetched ) {
        return (
          <Visualization className='Visualization'/>
          );
      }
    };

    const showSum = () => {
        if (this.props.districtsFetched ) {
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
  };
};

const dispatcher = (dispatch) => {
  return {
    _fetchDistricts: (dateFrom) => dispatch(fetchDistricts(dateFrom))
  };
};

export default connect(selector, dispatcher)(App);
