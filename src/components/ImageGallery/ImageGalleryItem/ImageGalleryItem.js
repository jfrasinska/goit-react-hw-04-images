import React from 'react';
import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

const ImageGalleryItem = ({ imageUrl, onClick }) => (
  <li className="ImageGalleryItem">
    <img
      src={imageUrl}
      alt=""
      className="ImageGalleryItem-image"
      onClick={onClick}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
