import React from 'react';
// import { connect } from "react-redux";
import { Switch, Route, Redirect } from 'react-router-dom';
import Nav from './Nav';
import Home from '../Home';
import SearchStock from '../SearchStock';
import History from '../History';
import SearchResult from '../SearchResult';
import PropTypes from 'prop-types';

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <Nav path={this.props.location.pathname} />
        <div className='content'>
            <Switch>
              <Route exact path='/' render={() => <Redirect to='/home'/>} />
              <Route path='/home' component={Home} />
              <Route path='/search' component={SearchStock} />
              <Route path='/history' component={History} />
              <Route path='/stock/:stockID' component={SearchResult} />
            </Switch>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  pathname: PropTypes.string,
  location: PropTypes.object
};
