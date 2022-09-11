import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImagesGallery from './ImageGallery/ImagesGallery';
import Loader from './Loader/Loader';
import { AppContainer } from './App.styled';
import { FetchImages } from '../services/pixabayApi';

export const App = () => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  const handleSearchbarSubmit = query => {
    setQuery(query);
    setPage(1);
    setItems([]);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    setStatus('pending');

    FetchImages(query, page)
      .then(data => {
        setItems(items => {
          return [...items, ...data.hits];
        });
        setStatus('loading');
      })
      .catch(error => setError(error));
  }, [query, page]);

  const loadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleSearchbarSubmit} />
      <ImagesGallery items={items} />
      {items.length !== 0 && <Button onClick={loadMore} />}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <div>{error.message}</div>}
    </AppContainer>
  );
};
