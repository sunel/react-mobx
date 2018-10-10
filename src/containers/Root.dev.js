import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, StaticRouter } from 'react-router-dom';
import DevTools from './DevTools';

export default class Root extends Component {
  render() {
    const { store, type, renderProps } = this.props;

    return (
      <Provider store={store}>
        <div>
          {type === 'server' ? <StaticRouter {...renderProps} /> : <Router children={this.props.children} />}
          <DevTools />
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,  
  type: PropTypes.string,
  renderProps: PropTypes.any,
}