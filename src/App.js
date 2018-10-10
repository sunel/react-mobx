import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

import { RouterOutlet, Link } from '@react-module/app';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link name="/404">/404</Link> <br />
        <Link name="user.list" params={{ id: 1 }}>user/1</Link> <br />
        <Link name="user.all">user</Link><br />
        <Link name="user.create">user/create</Link><br />
        <Link name="post.list" params={{ id: 1 }}>post/1</Link> <br />
        <Link name="post.all">post</Link><br />
        <Link name="article.list" params={{ id: 1 }}>artical/1</Link><br />
        <Link name="article.list" params={{ id: 1, title: 'new' }}>artical/1/new</Link><br />
        <RouterOutlet>
          {(handler, params) => {
            return handler(params);
          }}
        </RouterOutlet>
      </div>
    );
  }
}

export default App;
