import React, { useEffect } from 'react'
import { useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { search } from '../../app/api/SearchAxios'
import { useDispatch } from 'react-redux';
import { setResult } from '../../features/search/searchSlice';
import { useNavigate } from 'react-router';
import GetCookie from "../../cookies/JWT/GetCookie";
const token = GetCookie('jwt')

const Search = () => {

    const [query, setQuery] = useState('');
    const [data, setData] = useState({});

    const dispatch = useDispatch()

    const [err, setErr] = useState();
    
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault()
        search(query,token)
            .then((data) => {
                setData(data)
                navigate('/recherche');
            })
            .catch((error) => {
                setErr(error);
                console.log(err)
            });
    }

    useEffect(() => {
        if (data) {
            dispatch(setResult({ searchData: data }));
        }
    }, [data])

    return (
        <div className="rechercher">
            <form onSubmit={handleSearch} id="search-box">
                <input
                    className='search-input'
                    placeholder=" Rechercher..."
                    id="serch-input"
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                />
                <button
                    type='submit'
                >
                    <RiSearchLine
                        id="search-icon1"
                    />
                </button>
            </form>
        </div>
    )
}

export default Search
