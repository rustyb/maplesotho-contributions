import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import _ from 'lodash';
class Summary extends Component {
  constructor (props) {
    super(props);
    this.renderTable = this.renderTable.bind(this);
    this.renderEditors = this.renderEditors.bind(this);
  }

  renderEditors(data) {
    // const rows = data.reverse().map(row => {return this.renderRow(row)});
    const total = data ? _.sumBy(data, 'number') : 0
    return (<div key="editors">
      <h2>Editor Share</h2>
      <div className="selector--body">
        <dl className="dl-horizontal">
          {/*<dt>Total</dt>
                    <dd>{numeral(total).format()}</dd>*/}
          {data.sort(
            function(a, b) {return b.number - a.number }
            ).slice(0, 8).map((ed) => {
            return (<div key={ed.editor}>
              <dt>{ed.editor}</dt>
              <dd>{numeral(ed.number/total).format('0.00 %')}</dd>
              </div>
              )
          })}
        </dl>
        </div>
      </div>
      )
  }

  renderTable (district, data) {
    const rows = data.slice(1).map(row => {return this.renderRow(row)});
    const total = +data[0].t
    return (
      <div key={district}>
      <h2>{`${district} (${numeral(total).format()})`}</h2>
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

  render () {
    const districts = Object.keys(this.props.districts).slice(1);
    return (
      <div className="Selector--main">
        <div className="select--header">
          <img src="./assets/graphics/layout/maplesotho-logo_neg.svg" alt="maplesotho logo" className="mast-logo__image" />
          <h1>Summary</h1>
        </div>
        <div className="selector--body">
        <dl className="dl-horizontal">
          <dt>Total</dt>
          <dd>{numeral(this.props.districts[null][0].t).format()}</dd>
          {districts.map((dis) => {
            return (<div key={dis}>
              <dt>{dis}</dt>
              <dd>{numeral(this.props.districts[dis][0].t).format()}</dd>
              </div>
              )
          })}
        </dl>
        <div>
          {this.props.editors ? this.renderEditors(this.props.editors) : 'No editors'}
        </div>
        </div>
        
      </div>
    );
  }
}

const selector = (state) => {
  return {
    districts: state.maplesothoDistricts.districts,
    users: state.maplesothoUsers.users,
    editors: state.maplesothoEditors.editors
  };
};

const dispatcher = (dispatch) => {
  return {};
};

export default connect(selector, dispatcher)(Summary);
