import { useState } from 'react';
import {
  SearchbarContainer,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { ReactComponent as AddIcon } from 'components/icons/search.svg';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChangeQuery = evt => {
    setQuery(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (query.trim() === '') {
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <div>
      <SearchbarContainer>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton type="submit">
            <AddIcon width="15" height="15" />
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            name="query"
            value={query}
            onChange={handleChangeQuery}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarContainer>
    </div>
  );
};

export default Searchbar;
