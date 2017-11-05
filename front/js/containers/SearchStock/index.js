import _ from 'lodash';
import React, { Component } from 'react';
import { Search, Grid, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { bounce } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import axios from 'axios';
import './SearchStock.css';

const username = '3d66283476b5f3bfba55a40f7b30ec6c';
const password = '9320fc2b49b41cdbe5a7672d3e5563ec';
const url = 'https://api.intrinio.com/prices?identifier=';

export default class SearchStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      value: '',
      found: false,
      source: []
    };
  }

  componentWillMount() {
    this.init();
    this.resetComponent();
  }

  init = () => {
    axios.get('https://sandbox.tradier.com/v1/markets/search?q=' + this.state.value, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer pxibpJik4b0nxFtuXcuXcpPMcJ0A'
      }
    })
    .then((response) => {
    })
    .catch((err) => {
      console.log(err);
    });
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.props.history.push(`/stock/${result.price}`);

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });
    axios.get('https://sandbox.tradier.com/v1/markets/search?q=' + this.state.value, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer pxibpJik4b0nxFtuXcuXcpPMcJ0A'
      }
    })
    .then((response) => {
        var temp = [];
        response.data.securities.security.map((e, i) => {
          if (i < 10) {
            temp.push({
              title: e.description,
              price: e.symbol
            });
          }
        });
        this.setState({
          source: temp
        });
    })
    .catch((err) => {
      console.log(err);
    });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();
      this.setState({
        isLoading: false,
        results: this.state.source,
      });
    }, 500);
  }

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <div className='center'>
        <StyleRoot>
          <div style={styles.bounce}>
            <Header as='h2' icon>
              <Icon name='bar graph' circular />
              <Header.Content>
                Search
              </Header.Content>
            </Header>
            <div>
              <Grid>
                <Grid.Column width={16}>
                  <Search 
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={this.handleSearchChange}
                    results={results}
                    value={value}
                    {...this.props}
                  />
                </Grid.Column>
              </Grid>
            </div>
          </div>
        </StyleRoot>
      </div>
    );
  }
}

SearchStock.propTypes = {
  history: PropTypes.sring
};

const styles = {
  bounce: {
    animation: 'x 1s',
    animationName: Radium.keyframes(bounce, 'bounce')
  }
};
