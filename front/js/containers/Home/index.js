import React from 'react';
import PropTypes from 'prop-types';
import { bounce } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import { Header, Icon } from 'semantic-ui-react';
import './Home.css';

export default class Home extends React.Component {
	
	constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className='front-page'>
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