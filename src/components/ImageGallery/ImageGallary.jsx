import { Component } from 'react';
import css from './ImageGallary.module.css';
import PropTypes from 'prop-types';

import axios from 'axios';
import ImageGallaryItem from '../ImageGallaryItem/ImageGallaryItem';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '29781225-270ed18ae1ae383a725fedf91';

class ImageGallery extends Component {
  state = {
    error: null,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page, updatePictures } = this.props;
    if (prevProps.query !== query || prevProps.page !== page) {
      this.setState({ loading: true });
      axios
        .get(
          `/?key=${KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(res => {
          if (res.data.hits.length === 0) {
            return Promise.reject(new Error(`Немає зображення ${query}`));
          }
          this.setState({ error: null });
          const pictures = res.data.hits;
          updatePictures(pictures);
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { error } = this.state;
    return (
      <>
        <ul className={css.ImageGallery}>
          {!error ? (
            this.props.pictures.map(
              ({ user_id, webformatURL, tags, largeImageURL }) => (
                <li key={user_id}>
                  <ImageGallaryItem
                    url={webformatURL}
                    tags={tags}
                    largeURL={largeImageURL}
                  />
                </li>
              )
            )
          ) : (
            <p>{error.message}</p>
          )}
        </ul>
      </>
    );
  }
}

export default ImageGallery;
