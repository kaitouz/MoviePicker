import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import classes from './login.module.scss'

import authAPI from '../../api/serverAPI/authAPI'
import tmdbAPI from '../../api/tmdbAPI'
import { config } from '../../api/tmdbConfig'
import logo from '../../assets/logo.png'
import Loading from '../../components/loading/Loading'

const Login = () => {
  const navigate = useNavigate()
  const [bgURL, setBgURL] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    document.getElementById('email').focus()
    let intervalId
    tmdbAPI.getMoviesList('popular', {}).then(res => {
      const imgList = res.results.map(x => config.originalImage(x.poster_path))
      let i = Date.now() % 20
      setBgURL(imgList[i])
      intervalId = setInterval(
        () => {
          setBgURL(imgList[i++ % 20])
        }
        , 5000)
    })

    return () => clearInterval(intervalId)
  }, [])

  const submitOnEnter = e => {
    if (e.key == 'Enter') {
      submitForm()
    }
  }

  const showErr = errMessage => document.getElementById('err-msg').innerHTML = errMessage

  const submitForm = () => {
    console.log('processing..')
    if (email == null)
      document.getElementById('email-err').innerHTML = 'Please enter email'
    else document.getElementById('email-err').innerHTML = null

    if (password == null)
      document.getElementById('pass-err').innerHTML = 'Please enter password'
    else document.getElementById('pass-err').innerHTML = null

    if (email == null || password == null) return

    setProcessing(true)
    authAPI.login(email, password)
      .then(res => {
        const user = {
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
          role: res.data.user.role,
          avatar: res.data.user.avatar
        }

        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', res.data.accessToken)
        localStorage.setItem('refreshToken', res.data.refreshToken)

        console.log(res.data.msg)
        navigate('/')
      })
      .catch(err => {
        setProcessing(false)
        showErr(err.response.data)
        console.log(err)
      })
  }

  return (
    <div className={classes.login}>
      <div className={classes.form}>
        <Link to='/'>
          <div className={classes.logo}>
            <img src={logo} alt='logo' />
            <p>Popcorn</p>
          </div>
        </Link>

        <div className={classes.title}>
          <div>Welcome back!</div>
          <div>Welcome back! Please enter your details.</div>
        </div>

        <input id='email'
          type='email'
          name='email'
          placeholder='Email'
          autoFocus='autofocus'
          onChange={e => { setEmail(e.target.value) }}
          onKeyDown={submitOnEnter}
        />
        <div id='email-err' className={classes.err}></div>

        <input id='password'
          type='password'
          name='password'
          placeholder='Password'
          onChange={e => setPassword(e.target.value)}
          onKeyDown={submitOnEnter}
        />
        <div id='pass-err' className={classes.err}></div>

        <div id='err-msg' className={classes.err}></div>



        <div className={classes.forgot}>Forgot password</div>

        <button className={classes.loginBtn}
          onClick={submitForm}>
          {
            processing ? <Loading>Please wait</Loading> : 'Log in'
          }
        </button>

        <div>Don&apos;t have an account? <b className={classes.signup}
          onClick={() => { navigate('/signup') }}>
          Sign up
        </b> for free
        </div>
      </div>

      <div className={classes.background}>
        <img src={bgURL} alt='use_VPN' />
      </div>
    </div>
  )
}

export default Login
