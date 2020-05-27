import React, { Component } from 'react';
import Page from './Page/Page'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Page
          title="January" //temporarly
        />
      </div>
    );
  }
}

export default App;
