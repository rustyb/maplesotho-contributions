import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import moment from 'moment'
import { DateRangePicker, DayPickerRangeController } from 'react-dates';
import _ from 'lodash';
import {
  fetchDistricts
} from '../actions/action-creators';

class Visualizaiton extends Component {
  constructor (props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.getNewStats = this.getNewStats.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.state = {startDate: moment().subtract(10, 'days'), endDate: moment(), focusedInput: null};
  }

  componentDidMount () {
    this.props._fetchDistricts();
  }

  getNewStats (startDate, endDate) {
    this.setState({ startDate: startDate, endDate: endDate, })

    return this.props._fetchDistricts(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.districtsFetched !== this.props.districtsFetched) {
      return this.getNewStats();
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
    const districts = this.props.districts;
    let focusedInput = null;
    return (
      <div>
        <section className="panel">
        Choose the date to show stats from: {` `}
          <DateRangePicker
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={({ startDate, endDate }) => this.getNewStats(startDate, endDate)} // PropTypes.func.isRequired
            focusedInput={this.state.focusedInput} // PropTypes.bool
            onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
            isOutsideRange={() => false}
            displayFormat="DD MMM YY"
          />
        </section>
      
      <section className="panel">
        <header className="panel__header">
          <h1 className="panel__title">{this.props.districts.length} users loaded with an overall edit count of {numeral(_.sum(this.props.districts.map(x=>+x.t))).format()}</h1>
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
          {districts.map((dis) => {
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
    districtsFetched: state.maplesothoDistricts.fetched,
  };
};

const dispatcher = (dispatch) => {
  return {
    _fetchDistricts: (dateFrom, dateTo) => dispatch(fetchDistricts(dateFrom, dateTo))
  };
};

export default connect(selector, dispatcher)(Visualizaiton);
