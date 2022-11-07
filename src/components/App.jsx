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
    this.setState({ query: query, page: 1, pictures: [] });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  updatePictures = pictures => {
    this.setState(prevState => ({
      pictures: [...prevState.pictures, ...pictures],
    }));
  };

  render() {
    const { query, page, pictures } = this.state;
    return (
      <div>
        <Searcbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          query={query}
          page={page}
          pictures={pictures}
          loadMore={this.loadMore}
          updatePictures={this.updatePictures}
        />
        <ToastContainer />
      </div>
    );
  }
}

export default App;
