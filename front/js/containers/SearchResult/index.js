import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StockChart from '../../components/StockChart';
import TradeButton from '../../components/TradeButton';
import TradeModal from '../TradeModal';
import './SearchResult.css';

export default class SearchResult extends React.Component {
  
  constructor (props) {
    super(props);
    this.state = {
      modal: false,
      tradeMode: 'sell'
    };
  }

  setOpen = () => {
    this.setState({
      modal: true
    });
    console.log(this.state, 'open');
  }

  setClose = () => {
    this.setState({
      modal: false
    });
  }

  setTradeMode = (mode) => {
    this.setState({
      tradeMode: mode
    });
  }

  render () {
    const stockID = this.props.match.params.stockID;
    return (
      <div>
        <h1 className='center'>Recent Price of {stockID}</h1>
        <div>
          <TradeModal stockID={stockID} isOpen={this.state.modal} setOpen={this.setOpen} setClose={this.setClose} tradeMode={this.state.tradeMode} />
        </div>
        <StockChart stockID={stockID} />
        <TradeButton stockID={stockID} isOpen={this.state.modal} setOpen={this.setOpen} setClose={this.setClose} setTradeMode={this.setTradeMode} />
      </div>
    );
  }
}

SearchResult.propTypes = {
  loading: PropTypes.bool,
  match: PropTypes.object,
  params: PropTypes.object
};