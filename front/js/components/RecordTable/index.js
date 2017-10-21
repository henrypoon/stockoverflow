import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'semantic-ui-react';
import './RecordTable.css';
import PropTypes from 'prop-types';

export default class StockChart extends Component {
	render() {
    console.log(this.props.records.length);
    if (this.props.records.length === 0) {
      return (
        <div>
          <h1>
          No trading records
          </h1>
        </div>
      );
    }
		return (
      <div className='recordTable'>
        <Table celled inverted selectable >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Sell/Buy</Table.HeaderCell>
              <Table.HeaderCell>StockID</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
          {this.props.records.map((e, i) => (
            <Table.Row key={i}>
              <Table.Cell>{e.mode}</Table.Cell>
              <Table.Cell>{e.stockID}</Table.Cell>
              <Table.Cell>{e.quantity}</Table.Cell>
            </Table.Row>
          ))}
          </Table.Body>
        </Table>
      </div>
		);
	}
}




StockChart.propTypes = {
  records: PropTypes.array
};