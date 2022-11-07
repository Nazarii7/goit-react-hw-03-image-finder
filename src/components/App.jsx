import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Searcbar from './Searcbar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = {
    query: '',
    page: 1,
    pictures: [],
  };

  handleFormSubmit = query => {
    this.setState({ query: query });
  };

  updatePictures = pictures => {
    this.setState(prevState => ({
      pictures: [...prevState.pictures, pictures],
    }));
  };

  render() {
    const { query, page, pictures } = this.state;
    return (
      <div>
        <Searcbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          query={query}
          pictures={pictures}
          page={page}
          updatePictures={this.updatePictures}
        />
        <ToastContainer />
      </div>
    );
  }
}

export default App;
