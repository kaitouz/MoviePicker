import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import tmdbAPI from '../../api/tmdbAPI'
import { config } from '../../api/tmdbConfig'

import classes from './login.module.scss'

import { useEffect } from 'react'
import { useState } from 'react'

import logo from '../../assets/logo.png'
import authAPI from '../../api/serverAPI/authAPI'


//props.action = 'login' || 'signup'
const Login = (props) => {
  const navigate = useNavigate()
  
  const [bgURL, setBgURL] = useState(null)
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [rePassword, setRePassword] = useState(null)

  useEffect(() => {
    const params = {}
    tmdbAPI.getMoviesList('popular', params)
      .then(
        res => setBgURL(config.originalImage(res.results[Math.floor(Math.random() * 20)].poster_path))
      )
  }, [])

  const showErr = errMessage => document.getElementById('err-msg').innerHTML = errMessage 

  const validateEmail = () => {
    if (email == null) {
      document.getElementById('email-err').innerHTML = 'Please enter email'
      return false
    } else {
      if (!email.match('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')) {
        document.getElementById('email-err').innerHTML = 'Invalid email'
        return false
      }
      document.getElementById('email-err').innerHTML = null
      return true
    }
  }

  const validatePassword = () => {
    if (password == null || password.length < 6 || password.length > 16) {
      document.getElementById('pass-err').innerHTML = 'Password length must be between 6 and 16 characters'
      return false
    }
    document.getElementById('pass-err').innerHTML = null
    return true
  }

  const validateRePassword = () => {
    if (rePassword !== password) {
      document.getElementById('repass-err').innerHTML = 'Repeat password does not match'
      return false
    }
    document.getElementById('repass-err').innerHTML = null
    return true      
  }

  
      
  const submitForm = async () => {
    if (props.action === 'login') {
      if (email == null) 
        return document.getElementById('email-err').innerHTML = 'Please enter email'
      else document.getElementById('email-err').innerHTML = null

      if (password == null) 
        return document.getElementById('pass-err').innerHTML = 'Please enter password'
      else document.getElementById('pass-err').innerHTML = null

      authAPI.login(email, password).then(res => {
        const user = {
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
        }
        
        localStorage.setItem('user', user)
        localStorage.setItem('token', res.data.accessToken)
        localStorage.setItem('refreshToken', res.data.refreshToken)

        navigate('/')
      }).catch(err => {
        showErr(err.response.data)
      })
    }

    if (props.action === 'signup') {
      const shouldFormSubmit = validateEmail() && validatePassword() && validateRePassword()
      if (!shouldFormSubmit) {
        validateEmail()
        validatePassword()
        validateRePassword()
        return
      } 
        
      if (name == null) setName('User')
   
      authAPI.register(name, email, password).then(res => {
        const user = {
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
        }
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('refreshToken', res.data.refreshToken)
      
        navigate('/')
      }).catch(err => {
        showErr(err.response.data)
      })
      
      
    }
  }

  return (
    <div className={classes.login}>
      <div className={classes.form}>
        <Link to='/'>
          <div className={classes.logo}>
            <img src={logo} alt='logo'/>
            <p>Popcorn</p>
          </div>
        </Link>

        <div className={classes.title}>
          {
            props.action === 'login' 
              ? <div>Welcome back!</div> 
              : <div>Create an account</div>
          }

          {
            props.action === 'login' 
              ? <div>Welcome back! Please enter your details.</div> 
              : <div>Let's get started</div>
          }
        </div>

        {props.action === 'signup' ? 
        <>
          <input id='name'
            type='name'
            name='name'
            placeholder='Name'
            onChange={e => setName(e.target.value)}
          />
          <div id='name-err' className={classes.err}></div>
        </> : null}
        
        <input id='email'
          type='email' 
          name='email' 
          placeholder='Email'
          onChange={e => setEmail(e.target.value)}
        />
        <div id='email-err' className={classes.err}></div>

        <input id='password'
          type='password' 
          name='password' 
          placeholder='Password' 
          onChange={e => setPassword(e.target.value)}/>
        <div id='pass-err' className={classes.err}></div>
        
        {props.action === 'signup' ?
        <>
          <input id='re-password'
            type='password' 
            name='re-password' 
            placeholder='Repeat password' 
            onChange={e => setRePassword(e.target.value)}
          />
          <div id='repass-err' className={classes.err}></div>
        </> : null}

        <div id='err-msg' className={classes.err}></div>

        {props.action === 'login' ? <div className={classes.forgot}>Forgot password</div> : null}

        <button className={classes.loginBtn} 
                onClick={submitForm}>
                  {props.action === 'login' ? 'Log in' : 'Create account'}
        </button>
        {
          props.action === 'login' 
            ? <div>Don't have an account? 
              <b className={classes.signup} 
                onClick={() => { navigate('/signup') }}>
                  Sign up
              </b> for free</div>
            : <div>Already have an account? 
              <b className={classes.signup} 
              onClick={() => { navigate('/login') }}>
                Log in
              </b></div>
        }
      </div>

      <div className={classes.background}>
        <img src={bgURL} alt='_____use_VPN'/>
      </div>  
    </div>
  )
}

export default Login
