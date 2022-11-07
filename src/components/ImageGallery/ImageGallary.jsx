import { Component } from 'react';
import css from './ImageGallary.module.css';
import PropTypes from 'prop-types';
import { CirclesWithBar } from 'react-loader-spinner';

import axios from 'axios';
import ImageGallaryItem from '../ImageGallaryItem/ImageGallaryItem';

const URL = 'https://pixabay.com/api/';
const KEY = '29781225-270ed18ae1ae383a725fedf91';

class ImageGallery extends Component {
  state = {
    error: null,
    loading: false,
    loadMore: false,
  };

  componentDidUpdate(prevProps, _) {
    const { query, page, updatePictures } = this.props;
    if (prevProps.query !== query || prevProps.page !== page) {
      this.setState({ loading: true, loadMore: false });
      axios
        .get(
          `${URL}?key=${KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(res => {
          if (res.data.hits.length === 0) {
            return Promise.reject(new Error(`Немає зображення ${query}`));
          }
          this.setState({ error: null });
          const pictures = res.data.hits;
          updatePictures(pictures);
          pictures.length === 12
            ? this.setState({ loadMore: true })
            : this.setState({ loadMore: false });
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { error, loadMore, loading } = this.state;
    const { pictures } = this.props;
    return (
      <>
        <ul className={css.ImageGallery}>
          {!error ? (
            pictures.map(({ id, webformatURL, tags, largeImageURL }) => (
              <li className={css.ImageGalleryItem} key={id}>
                <ImageGallaryItem
                  url={webformatURL}
                  tags={tags}
                  largeUrl={largeImageURL}
                />
              </li>
            ))
          ) : (
            <p>{error.message}</p>
          )}
        </ul>
        {loading && (
          <CirclesWithBar
            height="100"
            width="100"
            color="#3f51b5"
            wrapperStyle={{ justifyContent: 'center' }}
            wrapperClass=""
            visible={true}
            outerCircleColor=""
            innerCircleColor=""
            barColor=""
            ariaLabel="circles-with-bar-loading"
          />
        )}
        {loadMore && (
          <button
            className={css.Button}
            type="button"
            onClick={this.props.loadMore}
          >
            Load more
          </button>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  loadMore: PropTypes.func,
  page: PropTypes.number,
  query: PropTypes.string,
  updatePictures: PropTypes.func,
};

export default ImageGallery;
