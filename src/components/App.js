import { useState, useEffect } from 'react';
import * as API from './api/fetchImages';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import React from 'react';
import Modal from './Modal/Modal';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSearch, setCurrentSearch] = useState('');
  const [pageNr, setPageNr] = useState(1);
  const [modalImg, setModalImg] = useState(false);
  const [modalOpen, setModalOpen] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!currentSearch) {
      return;
    }

    async function addImages() {
      try {
        setIsLoading(true);
        const data = await API.fetchImages(currentSearch, pageNr);

        if (!data.hits.length) {
          return toast.info('Sorry image not found...', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }

        const normalizedImages = API.normalizedImages(data.hits);

        setImages(prevImages => [...prevImages, ...normalizedImages]);
        setIsLoading(false);
        setTotalPages(Math.ceil(data.totalHits / 12));
      } catch {
        toast.error('Something went wrong!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } finally {
        setIsLoading(false);
      }
    }
    addImages();
  }, [currentSearch, pageNr]);

  const handleSubmit = inputValue => {
    setCurrentSearch(inputValue);
    setImages([]);
    setPageNr(1);
  };

  const handleClickMore = () => {
    setPageNr(prevPage => prevPage + 1);
  };

  const handleImageClick = image => {
    setModalImg(image);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleModalClose = () => {
    setModalImg(null);
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <ToastContainer transition={Slide} />
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 ? (
        <ImageGallery images={images} onItemClick={handleImageClick} />
      ) : (
        <p
          style={{
            padding: 100,
            textAlign: 'center',
            fontSize: 30,
          }}
        >
          Gallery is empty...
        </p>
      )}
      {isLoading && <Loader />}
      {images.length > 0 && totalPages !== pageNr && !isLoading && (
        <Button onClick={handleClickMore} />
      )}
      {modalOpen && <Modal image={modalImg} onClose={handleModalClose} />}
    </div>
  );
};

export default App;
