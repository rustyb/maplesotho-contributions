import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import moment from 'moment'
import {browserHistory} from 'react-router';
import { DateRangePicker, DayPickerRangeController } from 'react-dates';
import _ from 'lodash';
import {
  fetchDistricts,
  fetchUsers,
  fetchEditors
} from '../actions/action-creators';

import {buildQS} from '../lib/buildurl';


class Visualizaiton extends Component {
  constructor (props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderTable = this.renderTable.bind(this);
    
    this.getNewStats = this.getNewStats.bind(this);
    this.getUserStats = this.getUserStats.bind(this);
    
    this.onFocusChange = this.onFocusChange.bind(this);
    let query = _.clone(this.props.location.query);

    this.state = {startDate: moment(query.start_date) || moment().subtract(10, 'days'), endDate: moment(query.end_date) ||  moment(), focusedInput: null};
  }

  componentDidMount () {
    let query = _.clone(this.props.location.query);
    if (query.start_date) {
      this.props._fetchDistricts(moment(query.start_date), moment(query.end_date)) && this.getUserStats(moment(query.start_date), moment(query.end_date));
    } else {
      this.props._fetchDistricts();
      this.props._fetchUsers();
    }

    this.props._fetchEditors();
  }

  setDates (startDate, endDate) {
    this.setState({ startDate: startDate, endDate: endDate, })
  }

  getNewStats (startDate, endDate) {
    this.setDates(startDate, endDate)
    // let query = {}
    let query = _.clone(this.props.location.query);
    
    query.start_date = startDate.format('YYYY-MM-DD');
    query.end_date = endDate.format('YYYY-MM-DD');

    browserHistory.push(`/?${buildQS(query)}`);

    return this.props._fetchDistricts(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD')) && this.getUserStats(startDate, endDate);
  }

  getUserStats (startDate, endDate) {
    this.setDates(startDate, endDate)

    return this.props._fetchUsers(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.districtsFetched !== this.props.districtsFetched) {
      this.getNewStats();
    }
    if (prevProps.usersFetched !== this.props.usersFetched) {
      this.getUserStats();
    }
  }

  renderRow (row) {
    return (
      <tr key={row.user+row.c}>
        <th>{row.user}</th>
        <td>{+row.c}</td>
        <td>{+row.m}</td>
        <td>{+row.d}</td>
        <td>{+row.t}</td>
      </tr>
      )
  }
  renderTable (district, data) {
    const rows = data.slice(1).map(row => {return this.renderRow(row)});
    const total = +data[0].t
    return (
      <div key={district+''}>
      <h2 id={district}>{`${district} (${numeral(total).format()})`}</h2>
      <table  className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Create</th>
            <th>Mod</th>
            <th>Delete</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      </div>
      )
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render () {
    const users = this.props.users;
    let focusedInput = null;
    let query = _.clone(this.props.location.query);

    return (
      <div>
        <section className="panel">
        <span style={{marginLeft: '1rem'}} >Choose the date to show stats from:</span> {` `}
          <DateRangePicker
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={({ startDate, endDate }) => this.getNewStats(startDate, endDate)} // PropTypes.func.isRequired
            focusedInput={this.state.focusedInput} // PropTypes.bool
            onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
            isOutsideRange={() => false}
            displayFormat="DD MMM YY"
          />
          <a style={{marginLeft: '1rem'}} href={`https://national.maplesotho.com/?${buildQS(query)}`}>Permalink</a>
        </section>
      
      <section className="panel">
        <header className="panel__header">
          <h1 className="panel__title">{this.props.users.length} users loaded with an overall edit count of {numeral(_.sum(this.props.users.map(x=>+x.t))).format()}</h1>
        </header>
        <div className="area">
        <table  className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Create</th>
            <th>Mod</th>
            <th>Delete</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {users.map((dis) => {
            return this.renderRow(dis)
          })}
          </tbody>
      </table>

          
        </div>
      </section>
      </div>
    );
  }
}

const selector = (state) => {
  return {
    districts: state.maplesothoDistricts.districts,
    users: state.maplesothoUsers.users,
    districtsFetched: state.maplesothoDistricts.fetched,
    usersFetched: state.maplesothoDistricts.fetched,
    editorsFetched: state.maplesothoEditors.fetched,
    editors: state.maplesothoEditors.editors,
  };
};

const dispatcher = (dispatch) => {
  return {
    _fetchDistricts: (dateFrom, dateTo) => dispatch(fetchDistricts(dateFrom, dateTo)),
    _fetchUsers: (dateFrom, dateTo) => dispatch(fetchUsers(dateFrom, dateTo)),
    _fetchEditors: (...props) => dispatch(fetchEditors(...props))
  };
};

export default connect(selector, dispatcher)(Visualizaiton);
