import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectAlbumData } from '../redux/album/albumSelector';
import Loader from '../components/Loader';
import SearchBar from '../components/SearchComponent/SearchBar';
import SearchView from '../components/SearchComponent/SearchView';

const Search = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(selectAlbumData)

  return (
    loading ? <Loader /> :
      <>
        <SearchBar />
        <SearchView />
      </>

  )
}

export default Search