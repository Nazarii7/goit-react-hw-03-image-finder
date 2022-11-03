import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Searcbar from './Searcbar';

class App extends Component {
  state = {
    query: '',
  };

  handleFormSubmit = query => {
    this.setState({ query: query });
  };

  render() {
    const { query } = this.state;
    return (
      <div>
        <Searcbar onSubmit={this.handleFormSubmit} />
        <ToastContainer />
      </div>
    );
  }
}

export default App;
