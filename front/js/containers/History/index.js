import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecordTable from '../../components/RecordTable';
import { bounce } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import { Header, Icon } from 'semantic-ui-react';
import './History.css';

@connect((store) => {
  return {
    user: store.user,
  };
})
export default class History extends React.Component {
	
	constructor (props) {
    super(props);
  }

  render () {
    console.log(this.props);
    return (
      <div className='center'>
        <StyleRoot>
          <div style={styles.bounce}>
            <Header as='h2' icon textAlign='center'>
              <Icon name='tasks' circular />
              <Header.Content>
                History
              </Header.Content>
            </Header>
          </div>
        </StyleRoot>
        <RecordTable records={this.props.user.record} />
      </div>
    );
  }
}

History.propTypes = {
  record: PropTypes.array,
  user: PropTypes.object,
};

const styles = {
  bounce: {
    animation: 'x 1s',
    animationName: Radium.keyframes(bounce, 'bounce')
  }
};
