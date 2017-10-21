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
            this.props.setOpen();
            this.props.setTradeMode('buy');
          }}>Buy</Button>
          <Divider horizontal>Or</Divider>
          <Button secondary fluid onClick={()=> {
            this.props.setOpen();
            this.props.setTradeMode('sell');
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