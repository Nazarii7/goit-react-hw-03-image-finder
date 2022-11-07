import Modal from '../Modal/Modal';
import { Component } from 'react';
import css from './ImageGallaryItemImage.module.css';
import PropTypes from 'prop-types';

class ImageGallaryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  render() {
    const { url, tags, largeUrl } = this.props;
    return (
      <>
        <img
          className={css.ImageGallaryItemImage}
          src={url}
          alt={tags}
          onClick={this.toggleModal}
        />

        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            largeUrl={largeUrl}
            tags={tags}
          ></Modal>
        )}
      </>
    );
  }
}

ImageGallaryItem.propTypes = {
  largeUrl: PropTypes.string,
  tags: PropTypes.string,
  url: PropTypes.string,
};

export default ImageGallaryItem;
