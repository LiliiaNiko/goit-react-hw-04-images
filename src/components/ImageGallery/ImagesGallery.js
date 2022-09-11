import { useState } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImagesGalleryContainer } from './ImagesGallery.styled';
import Modal from 'components/Modal/Modal';

const ImagesGallery = ({ items }) => {
  const [openModal, setOpenModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  const showModal = ({ largeImageURL, tags }) => {
    setOpenModal(true);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const closeModal = () => {
    setOpenModal(false);
    setLargeImageURL('');
    setTags('');
  };

  return (
    <>
      <ImagesGalleryContainer>
        {items.map(item => (
          <ImageGalleryItem
            key={item.id}
            id={item.id}
            webformatURL={item.webformatURL}
            largeImageURL={item.largeImageURL}
            tags={item.tags}
            showModal={showModal}
          />
        ))}
      </ImagesGalleryContainer>
      {openModal && (
        <Modal
          onCloseModal={closeModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}
      ;
    </>
  );
};

export default ImagesGallery;

ImagesGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
