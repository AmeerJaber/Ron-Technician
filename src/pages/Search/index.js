import React from 'react';
import SearchBar from '../../components/SearchBar';
import ProductResults from './../../components/ProductResults';

const Search = ({ }) => {
  return (
    <div className="searchPage">
      <SearchBar />
      <ProductResults />
    </div>
  );
};

export default Search;
