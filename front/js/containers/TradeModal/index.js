import React, { Component } from 'react';
import { Button, Modal, Statistic, Image, List, Transition } from 'semantic-ui-react';
import { sell, buy } from '../../actions/tradeActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

@connect((store) => {
  return store;
})
export default class TradeModal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      open: false, 
      quantity: 0,
      balance: this.props.user.balance
    };
  }  

  handleAdd = () => {
    this.setState({ 
      quantity: this.state.quantity + 1,
      balance: Math.round(this.state.balance - this.props.search.price, 2)
    });
  }
  
  handleRemove = () => {
    this.setState({ 
      quantity: this.state.quantity - 1,
      balance: Math.round(this.state.balance + this.props.search.price, 2)
    });
  }

  componentDidMount() {
    this.setState({
      balance: this.props.user.balance,
      quantity: 0
    });
  }

  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, size } = this.state;

    return (
      <div>
        <Button onClick={this.show('large')}>Small</Button>

        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>
            Trade Board
          </Modal.Header>
          <Modal.Content>
            <p>Are you going to buy this stock</p>
            <div>
              <Statistic>
                <Statistic.Label>Price per stock</Statistic.Label>
                <Statistic.Value>${this.props.search.price}</Statistic.Value>
              </Statistic>
              <Statistic>
                <Statistic.Label>Balance</Statistic.Label>
                <Statistic.Value>${this.state.balance}</Statistic.Value>
              </Statistic>
              <Statistic>
                <Statistic.Label>Quantity</Statistic.Label>
                <Statistic.Value>${this.state.quantity}</Statistic.Value>
              </Statistic>
              <Button.Group>
                <Button disabled={this.state.quantity === 0} icon='minus' onClick={this.handleRemove} />
                <Button disabled={this.state.quantity === 20} icon='plus' onClick={this.handleAdd} />
              </Button.Group>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => {
              this.setState({
                balance: this.props.user.balance,
                quantity: 0
              });
              this.close();
            }}>
              No
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => {
              this.props.dispatch(sell(this.props.stockID, this.state.balance));
              this.close();
              this.setState({
                balance: this.props.user.balance,
                quantity: 0
              });
            }}/>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

TradeModal.propTypes = {
  dispatch: PropTypes.function,
  user: PropTypes.object,
  balance: PropTypes.string,
  stockID: PropTypes.string,
  search: PropTypes.object,
  price: PropTypes.integer
};