import React from 'react'
import { useLocation } from 'react-router-dom'

import './footer.scss'

import logo from '../../assets/logo.png'
import github_logo from '../../assets/github_icon.png'

const Footer = () => {
    const { pathname } = useLocation()
    let hide = false
    if (pathname === '/login' || pathname === '/signup') hide = true
    console.log(pathname)
    return (
        <div className='footer' style={hide?{display: 'none'}:null}>
            <div className='copyright'>Ⓒ2022 POPCORN</div>
            <div className='foot-logo'>
                <img src={logo} alt='popcorn'/>
                <p>Popcorn</p>
            </div>
            <a className='github-source' href='https://github.com/kaitouz/MoviePicker' target='_blank'>
                <img src={github_logo}></img>
            </a>
            
        </div>
    )
}

export default Footer