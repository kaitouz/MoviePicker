import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

import './movieGrid.scss'

import tmdbAPI, { movieType, tvType } from '../../api/tmdbAPI';
import { tvGenres, movieGenres } from '../../api/tmdbConfig';
import MovieCard from '../movieCard/MovieCard';
import Button from '../button/Button';
import Loading from '../loading/Loading';

const MovieGrid = () => {
    const { category, id, keyword } = useParams();
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        const fetchItems = async () => {
            let response = null
            setPage(0)
            if (id === undefined && keyword === undefined) {
                switch (category) {
                    case 'movie':
                        response = await tmdbAPI.getMoviesList(movieType.upcoming, {})
                        break
                    default:
                        response = await tmdbAPI.getTvList(tvType.popular, {})
                }
            } else if (keyword === undefined) {
                response = await tmdbAPI.searchByGenres(category, id)
            } else {
                response = await tmdbAPI.search(category, { query: keyword })
            }
            setItems(response.results)
            setPage(1)
            setTotalPage(response.total_pages)
        }

        fetchItems()
    }, [category, id, keyword])

    const loadMoreMovies = async () => {
        let response = null
        if (id === undefined && keyword === undefined) {

            switch (category) {
                case 'movie':
                    response = await tmdbAPI.getMoviesList(movieType.upcoming, { page: page + 1 })
                    break
                default:
                    response = await tmdbAPI.getTvList(tvType.popular, { page: page + 1 })
            }
        } else if (keyword === undefined) {
            response = await tmdbAPI.searchByGenres(category, id, page + 1)
        } else {
            response = await tmdbAPI.search(category, { query: keyword, page: page + 1 })
        }

        setItems([...items, ...response.results])
        setPage(page + 1)
    }

    const title = () => {
        if (page === 0) return null
        if (items.length === 0) return "Sorry, we couldn't found any results."
        if (id === undefined && keyword === undefined) 
            return category === 'movie' ? 'Upcomming movies:' : 'Popular TV shows'
        return 'Search results for ' 
            + (category === 'movie' ? 'movies' : 'TV shows') 
            + ' with ' 
            + (id ? 'genre ' : 'keyword ')
    }

    const getPattern = () => {
        if (page === 0 || totalPage === 0) return null
        if (id === undefined && keyword === undefined) return null
        if (id === undefined) return keyword
        if (category === 'movie')
            return movieGenres.filter(e => e.id == id)[0].name
        return tvGenres.filter(e => e.id == id)[0].name
    }

    return (
        <div className='movie-grid'>
            <div className='movie-grid__title'>
                {title()}<b>{getPattern()}</b>
                {page === 0 ? <Loading>{keyword ? 'Searching' : 'Loading'}</Loading>:null}
            </div>
            <div className="movie-grid__items">
                {
                    items.map((item, i) =>
                        <div key={i} className='movie-grid__items__element'>
                            <MovieCard category={category} item={item} />
                        </div>)
                }
                {page > 0 && page < totalPage ?
                    <div className="movie-grid__items__load-more movie-grid__items__element">
                        <Button name='Load more' onClick={loadMoreMovies} />
                    </div> : null}
            </div>
        </div>
    )
}

export default MovieGrid