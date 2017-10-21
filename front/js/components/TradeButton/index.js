import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Button, Divider } from 'semantic-ui-react';

export default class TradeButton extends React.Component {
  
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <Segment padded>
          <Button primary fluid>Buy</Button>
          <Divider horizontal>Or</Divider>
          <Button secondary fluid>Sell</Button>
        </Segment>
      </div>
    );
  }
}

TradeButton.propTypes = {
  stockID: PropTypes.string
};