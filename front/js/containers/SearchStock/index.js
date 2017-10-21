import _ from 'lodash';
import faker from 'faker';
import React, { Component } from 'react';
import { Search, Grid, Header, Icon, Image } from 'semantic-ui-react';
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
      found: false
    };
  }

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.props.history.push(`/stock/${result.title}`);

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    const source = [];

    axios.get(url + this.state.value, {
      auth: {
        username: username,
        password: password
      }
    })
    .then((response) => {
      console.log(response);
      if (response.data.data.length > 0) {
        source.push({
          title: this.state.value,
          price: '$' + response.data.data[0].open
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      // let url = 'http://d.yimg.com/aq/autoc?query=' + this.state.value + '&region=US&lang=en-US&callback=YAHOO.util.ScriptNodeDataSource.callbacks';

      // const source = _.times(5, () => ({
      //   title: faker.company.companyName(),
      //   description: faker.company.catchPhrase(),
      //   price: faker.finance.amount(0, 100, 2, '$'),
      // }));
      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);
      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
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
