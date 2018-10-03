import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, RouterContext } from "react-router-dom";

export default class Root extends Component {
  render() {
    const { store, type, renderProps } = this.props;

    return (
      <Provider store={store}>
        { type === 'server'
          ? <RouterContext {...renderProps} />
          : <Router children={this.props.children}/>
        }
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  type: PropTypes.string,
  renderProps: PropTypes.any,
};