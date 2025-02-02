import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import {
  HeaderSearchBar,
  Input,
  SearchBtn,
  SearchForm,
  SearchSpan,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleChange = event => setSearchName(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(searchName.trim());
    event.target.reset();
  };

  return (
    <HeaderSearchBar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchBtn type="submit" onSubmit={handleSubmit}>
          <BsSearch />
          <SearchSpan>Search</SearchSpan>
        </SearchBtn>
        <Input
          name="searchName"
          type="text"
          id="search"
          value={searchName}
          onChange={handleChange}
          placeholder="Search images and photos"
        />
      </SearchForm>
    </HeaderSearchBar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
