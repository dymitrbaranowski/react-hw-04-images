import { Component } from 'react';
import * as API from './api/fetchImages';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import React from 'react';
import Modal from './Modal/Modal';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    currentSearch: '',
    pageNr: 1,
    modalOpen: false,
    modalImg: null,
    modalAlt: '',
    totalPages: 0,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.currentSearch !== this.state.currentSearch ||
      prevState.pageNr !== this.state.pageNr
    ) {
      this.addImages();
    }
  }

  addImages = async () => {
    const { currentSearch, pageNr } = this.state;
    try {
      this.setState({ isLoading: true });
      const data = await API.fetchImages(currentSearch, pageNr);

      if (data.hits.length === 0) {
        return toast.info('Sorry image not found...', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      const normalizedImages = API.normalizedImages(data.hits);

      this.setState(state => ({
        images: [...state.images, ...normalizedImages],
        isLoading: false,
        error: '',
        totalPages: Math.ceil(data.totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: 'Something went wrong!' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = inputValue => {
    this.setState({
      images: [],
      isLoading: false,
      currentSearch: inputValue,
      pageNr: 1,
    });
  };

  handleClickMore = () => {
    this.setState(prevState => ({
      pageNr: prevState.pageNr + 1,
    }));
  };

  handleImageClick = image => {
    this.setState({ modalImg: image, modalOpen: true });
    document.body.style.overflow = 'hidden';
  };

  handleModalClose = () => {
    this.setState({ modalImg: null, modalOpen: false });
    document.body.style.overflow = 'auto';
  };

  render() {
    const { images, isLoading, pageNr, modalImg, modalOpen, totalPages } =
      this.state;
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
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length > 0 ? (
          <ImageGallery images={images} onItemClick={this.handleImageClick} />
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
          <Button onClick={this.handleClickMore} />
        )}
        {modalOpen && (
          <Modal image={modalImg} onClose={this.handleModalClose} />
        )}
      </div>
    );
  }
}

export default App;
