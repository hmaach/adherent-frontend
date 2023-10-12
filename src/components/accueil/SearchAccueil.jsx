import React from 'react'
import { useEffect } from 'react';
import SearchMain from './main/SearchMain';
import { useSelector } from 'react-redux';
import { selectSearchData } from '../../features/search/searchSlice';
import { useState } from 'react';
import Right from './right/right';

const SearchAccueil = () => {
  const dataSearch = useSelector(selectSearchData)  
  const [data, setData] = useState({})

  useEffect(() => {
    setData(dataSearch)
  }, [dataSearch])

  return (
    <div className='spinner_main'>
      <SearchMain 
        data={data}
      />
      <Right />
    </div>
  )
}

export default SearchAccueil
