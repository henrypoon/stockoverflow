import React, { Component } from 'react';
import { Button, Modal, Statistic} from 'semantic-ui-react';
import { sell, buy } from '../../actions/tradeActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './TradeModal.css';

@connect((store) => {
  return store;
})
export default class TradeModal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      quantity: 0,
      balance: this.props.user.balance
    };
  }  

  componentDidMount() {
    this.setState({
      balance: this.props.user.balance,
      quantity: 0
    });
  }

  handleAdd = () => {
    this.setState({ 
      quantity: this.state.quantity + 1,
      balance: this.props.tradeMode === 'buy' ? Math.round(this.state.balance - this.props.search.price, 2): Math.round(this.state.balance + this.props.search.price, 2)
    });
  }
  
  handleRemove = () => {
    this.setState({ 
      quantity: this.state.quantity - 1,
      balance: this.props.tradeMode === 'buy' ? Math.round(this.state.balance + this.props.search.price, 2): Math.round(this.state.balance - this.props.search.price, 2)
    });
  }

  render() {
    return (
      <div>
        <Modal size='large' open={this.props.isOpen} onClose={this.props.setClose}>
          <Modal.Header>
            Trade Board
          </Modal.Header>
          <Modal.Content>
            <p>Are you going to buy this stock</p>
            <div className='center'>
              <Statistic>
                <Statistic.Label>Price per stock</Statistic.Label>
                <Statistic.Value>${this.props.search.price}</Statistic.Value>
              </Statistic>
              <Statistic>
                <Statistic.Label>Remain Balance</Statistic.Label>
                <Statistic.Value>${this.state.balance}</Statistic.Value>
              </Statistic>
              <Statistic>
                <Statistic.Label>Quantity</Statistic.Label>
                <Statistic.Value>{this.state.quantity}</Statistic.Value>
              </Statistic>
              {this.props.tradeMode === 'buy' ? (
                <Button.Group>
                  <Button disabled={this.state.quantity === 0} icon='minus' onClick={this.handleRemove} />
                  <Button disabled={this.state.balance - this.props.search.price < 0} icon='plus' onClick={this.handleAdd} />
                </Button.Group>
                ) : (
                  <Button.Group>
                    <Button disabled={this.state.quantity === 0} icon='minus' onClick={this.handleRemove} />
                    <Button disabled={!this.props.user.hold[this.props.stockID] || this.props.user.hold[this.props.stockID] === 0 } icon='plus' onClick={this.handleAdd} />
                  </Button.Group>
                )
              }
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => {
              this.setState({
                balance: this.props.user.balance,
                quantity: 0
              });
              this.props.setClose();
            }}>
              No
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => {
              if (this.props.tradeMode === 'buy') {
                this.props.dispatch(buy(this.props.stockID, this.state.balance, this.state.quantity));
                this.props.setClose();
                this.setState({
                  balance: this.state.balance,
                  quantity: 0
                });
              } else {
                this.props.dispatch(sell(this.props.stockID, this.state.balance, this.state.quantity));
                this.props.setClose();
                this.setState({
                  balance: this.state.balance,
                  quantity: 0
                });
              }
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
  price: PropTypes.integer,
  isOpen: PropTypes.bool,
  setClose: PropTypes.function,
  tradeMode: PropTypes.string
};