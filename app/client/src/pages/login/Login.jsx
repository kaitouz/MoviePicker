import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


import classes from './login.module.scss'

import logo from '../../assets/logo.png'
import { useEffect } from 'react'
import { useState } from 'react'

let URL ='https://www.themoviedb.org/t/p/w600_and_h900_bestv2/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg'
//URL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/uez7jwNd3oO87ceRr6nX8yCQvsL.jpg'


//props.action = 'login' || 'signup'
const Login = (props) => {
  const navigate = useNavigate()
  
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [rePassword, setRePassword] = useState(null)
  
  useEffect(() => {
    //get background
    //add event onchange of fields
    //remove event when component unmount
  }, [])
  
  const submitForm = () => {
    alert('Tính năng chưa code ))')
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
          {props.action === 'login' ? <div>Welcome back!</div> : <div>Create an account</div>}
          {props.action === 'login' ? <div>Welcome back! Please enter your details.</div> : <div>Let's get started</div>}
        </div>

        {props.action === 'signup' ? <input type='name' name='name' placeholder='Name'/> : null}
        <input type='email' name='email' placeholder='Email'/>
        <input type='password' name='password' placeholder='Password' />
        {props.action === 'signup' ? <input type='password' name='re-password' placeholder='Repeat password' /> : null}

        {props.action === 'login' ? <div className={classes.forgot}>Forgot password</div> : null}
        <button className={classes.loginBtn} onClick={submitForm}>{props.action === 'login' ? 'Log in' : 'Create account'}</button>
        {
          props.action === 'login' ? 
            <div>Don't have an account? <b className={classes.signup} onClick={() => { navigate('/signup') }}>Sign up</b> for free</div>:
            <div>Already have an account? <b className={classes.signup} onClick={() => { navigate('/login') }}>Log in</b></div>
        }

       
      </div>

      <div className={classes.background}>
        <img src={URL} alt='background_image'/>
      </div>  
    </div>
  )
}

export default Login
