import { Component } from 'react';

class ImageGallaryItem extends Component {
  state = {};

  render() {
    const { url, tags, largeUrl } = this.props;
    return (
      <>
        <img src={url} alt={tags} />
      </>
    );
  }
}

export default ImageGallaryItem;
