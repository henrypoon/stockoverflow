import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';

@connect((store) => {
  return {
    balance: store.user.balance
  };
})
export default class Nav extends Component {
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    console.log(this.props);
    const { visible } = this.state;
    return (
      <div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='scale down' direction='top' visible={true} inverted>
            <Menu.Item name='home'>
              <Link to='/home'>
              <Icon name='home' />
              Home
              </Link>
            </Menu.Item>
            <Menu.Item name='Search'>
              <Link to='/search'>
              <Icon name='bar graph' />
              Search
              </Link>
            </Menu.Item>
            <Menu.Item name='History'>
              <Link to='/history'>
              <Icon name='tasks' />
              History
              </Link>
            </Menu.Item>
            <Menu.Item name='balance'>
              Asset Balance: ${this.props.balance}
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Header as='h3'>Application Content</Header>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

Nav.propTypes = {
  balance: PropTypes.integer
};

