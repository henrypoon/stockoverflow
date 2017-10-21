import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecordTable from '../../components/RecordTable';

@connect((store) => {
  return {
    user: store.user,
  };
})
export default class History extends React.Component {
	
	constructor (props) {
    super(props);
  }

  render () {
    console.log(this.props);
    return (
      <div>
        <h1>History</h1>
        <RecordTable />
      </div>
    );
  }
}
