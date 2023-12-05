import React, { useState, useEffect } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Loader from '../Loader';
import './App.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchImages = () => {
    const API_KEY = '41090816-2f85d2c28c91be280660fa627';
    const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`;

    setIsLoading(true);

    fetch(BASE_URL)
      .then(response => response.json())
      .then(data => {
        setImages(prevImages => [...prevImages, ...data.hits]);
        setPage(prevPage => prevPage + 1);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSearchSubmit = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleImageClick = newLargeImageURL => {
    setLargeImageURL(newLargeImageURL);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  useEffect(() => {
    if (!query) return;

    fetchImages();
  }, [query, page, fetchImages]);

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <Button onClick={fetchImages} />}
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </div>
  );
};

export default App;
