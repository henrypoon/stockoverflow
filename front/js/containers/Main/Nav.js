import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';
// import Login from '../../components/Login';
import NotificationSystem from 'react-notification-system';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';


export default class Nav extends Component {
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
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
              <Link to='/Search'>
              <Icon name='camera' />
              Search
              </Link>
            </Menu.Item>
            <Menu.Item name='History'>
              <Link to='/History'>
              <Icon name='gamepad' />
              History
              </Link>
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Header as='h3'>Application Content</Header>
              <Image src='/assets/images/wireframe/paragraph.png' />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

