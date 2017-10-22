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
          <Button primary fluid onClick={()=> {
            this.props.setTradeMode('buy');
            this.props.setOpen();
          }}>Buy</Button>
          <Divider horizontal>Or</Divider>
          <Button secondary fluid onClick={()=> {
            this.props.setTradeMode('sell');
            this.props.setOpen();
          }}>Sell</Button>
        </Segment>
      </div>
    );
  }
}

TradeButton.propTypes = {
  stockID: PropTypes.string,
  setOpen: PropTypes.function,
  setTradeMode: PropTypes.function
};