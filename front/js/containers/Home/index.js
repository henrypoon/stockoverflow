import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StockChart from '../../components/StockChart';
import { bounce } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import { Header, Icon, Image } from 'semantic-ui-react';

@connect((store) => {
  return store.home.first;
})
export default class Home extends React.Component {
	
	constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className='front-page' onClick={() => console.log('hey')}>
        <StyleRoot>
          <div style={styles.bounce}>
            <Header as='h2' icon textAlign='center'>
              <Icon name='users' circular />
              <Header.Content>
                Welcome To StockOverflow
              </Header.Content>
            </Header>
          </div>
        </StyleRoot>
      </div>
    );
  }
}

Home.propTypes = {
	loading: PropTypes.bool
};

const styles = {
  bounce: {
    animation: 'x 1s',
    animationName: Radium.keyframes(bounce, 'bounce')
  }
};