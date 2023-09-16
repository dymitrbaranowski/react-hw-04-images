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
  const [inputValue, setInputValue] = useState('');

  const handleChange = event => setInputValue(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    setSearchName(inputValue.trim());
    onSubmit(searchName);
    event.target.reset();
  };

  return (
    <HeaderSearchBar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchBtn>
          <BsSearch />
          <SearchSpan>Search</SearchSpan>
        </SearchBtn>
        <Input
          name="searchName"
          type="text"
          id="search"
          value={inputValue}
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
