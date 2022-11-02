import React, {useRef} from 'react'
import { Link, useLocation } from 'react-router-dom'

import './header.scss'

import logo from '../../assets/logo.png'
import { useEffect } from 'react'

const headerNav = [
    {
        display: 'Home',
        path: '/'
    },
    {
        display: 'Movies',
        path: '/movie'
    },
    {
        display: 'TV Series',
        path: '/tv'
    }
]

const Header = (props) => {

    const {pathname} = useLocation()
    const headerRef = useRef(null)
    const active = headerNav.findIndex(e => e.path == pathname)

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink')
            } else {
                headerRef.current.classList.remove('shrink')
            }
            window.addEventListener('scroll', shrinkHeader)
            return () => {
                window.removeEventListener('scroll', shrinkHeader)
            };
        }
    }, [])

    
    return (
        <div ref={headerRef} className={['header', active===-1?'hide':''].join(' ')}>
            {console.log(active)}
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="img not found" />
                    <Link to="/">Popcorn</Link>
                </div>
                <ul className="header__nav">
                    {
                        headerNav.map((e, i) => (
                            <li key={i} className={`${i === active ? 'active' : ''}`}>
                                <Link to={e.path}>
                                    {e.display}
                                </Link>
                            </li>
                        ))
                    }
                    <li className='login'>
                        <Link to='/login'>
                            <i className="fa fa-sign-in" style={{'fontSize': '48px','color': 'red'}}></i>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header