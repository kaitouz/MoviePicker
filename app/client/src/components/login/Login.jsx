import React from 'react'
import { Link } from 'react-router-dom'


import classes from './login.module.scss'

import logo from '../../assets/logo.png'

const URL ='https://www.themoviedb.org/t/p/w600_and_h900_bestv2/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg'


const Login = () => {
  return (
    <div className={classes.login}>
      


      <div className={classes.form}>
        <Link to='/'>
          <div className={classes.logo}>
            <img src={logo} />
            <p>Popcorn</p>
          </div>
        </Link>

        <div className={classes.title}>
          <div>Welcome back!</div>
          <div>Welcome back! Please enter your details.</div>
        </div>

        <input type='email' name='email' placeholder='Email'/>
        <input type='password' name='password' placeholder='Password' />

        <div className={classes.forgot}>Forgot password</div>
        <button className={classes.loginBtn}>Login</button>
        <div>Don't have an account? <b className={classes.signup}>Sign up</b> for free</div>
      </div>

      <div className={classes.background}>
        <img src={URL} />
      </div>  

      
     
    </div>
  )
}

export default Login
