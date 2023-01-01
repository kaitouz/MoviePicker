import React, { useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import './header.scss'

import logo from '../../assets/logo.png'
import default_avt from '../../assets/default_avt.png'
import { useEffect } from 'react'
import apiConfig from '../../api/serverAPI/apiConfig'
import authAPI from '../../api/serverAPI/authAPI'

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

const Header = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const shouldHide = pathname === '/login' || pathname === '/signup'
    const headerRef = useRef(null)
    const active = headerNav.findIndex(e => e.path == pathname)
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink')
            } else {
                headerRef.current.classList.remove('shrink')
            }
        }
        window.addEventListener('scroll', shrinkHeader)
        const refreshToken = localStorage.getItem('refreshToken')
        const token = localStorage.getItem('token')

        if (refreshToken && token) {
            authAPI.refreshToken(refreshToken, token).then(res => {
                console.log('auto refresh token')
                localStorage.setItem('token', res.data.accessToken)
            }).catch(err => {
                logout()
                console.log(err)
            })
        }

        const autoRefreshToken = setInterval(() => {
            if (refreshToken && token) {
                authAPI.refreshToken(refreshToken, token).then(res => {
                    console.log('auto refresh token')
                    localStorage.setItem('token', res.data.accessToken)
                }).catch(err => {
                    console.log(err)
                    clearInterval(autoRefreshToken)
                })
            } else clearInterval(autoRefreshToken)
        }, 540000)

        return () => {
            clearInterval(autoRefreshToken)
            window.removeEventListener('scroll', shrinkHeader)
        };
    }, [])

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('refreshToken')
        navigate(0)
    }

    return (
        <div ref={headerRef} className={['header', shouldHide ? 'hide' : ''].join(' ')}>
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
                    {localStorage.getItem('token')
                        ? <div className='user-config'>
                            <img src={apiConfig.imgURL(user.avatar) || default_avt}></img>
                            <div className='dropdown-list'>
                                <a href='/bookmark'>Bookmarks</a>
                                <a href='/setting'>Setting</a>
                                <a onClick={logout}>Sign out</a>
                            </div>
                        </div>
                        : <div className='login'>
                            <Link to='/login'>
                                <i className="fa fa-sign-in" style={{ 'fontSize': '48px' }}></i>
                            </Link>
                        </div>
                    }
                </ul>
            </div>
        </div>
    )
}

export default Header