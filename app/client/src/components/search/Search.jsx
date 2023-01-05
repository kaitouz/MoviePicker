import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import './search.scss'

import Button from '../button/Button'

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const { category } = useParams()
    const [cate, setCate] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        setCate(category === 'movie' ? 'Movie' : 'TV')
    }, [category])

    const searchHandle = () => {
        if (keyword.trim().length > 0) {
            navigate(`/${cate.toLocaleLowerCase()}/search/${keyword}`);
        } else navigate(`/${cate.toLocaleLowerCase()}`)
    }

    return (
        <div className='search'>
            <input type='text' placeholder='Enter keyword...'
                onChange={e => setKeyword(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') searchHandle()
                }}
            ></input>
            <div className="search__dropdown">
                <div className="search__dropdown__button">
                    <div>{cate}</div>
                    <div className="arrow"></div>
                </div>

                <ul className='search__dropdown__menu'>
                    <li onMouseDown={() => setCate('Movie')}>Movie</li>
                    <li onMouseDown={() => setCate('TV')}>TV</li>
                </ul>
            </div>
            <Button name='Search' onClick={searchHandle}></Button>
        </div>
    )
}

export default Search