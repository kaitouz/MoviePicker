import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import classes from './signup.module.scss'

import tmdbAPI from '../../api/tmdbAPI'
import authAPI from '../../api/serverAPI/authAPI'
import { config } from '../../api/tmdbConfig'
import logo from '../../assets/logo.png'
import Loading from '../../components/loading/Loading'

const Signup = () => {
    const navigate = useNavigate()

    const [bgURL, setBgURL] = useState(null)
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [rePassword, setRePassword] = useState(null)
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        document.getElementById('name').focus()
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

    const validateName = () => {
        if (name == null) {
            document.getElementById('name-err').innerHTML = 'Please enter your name'
            return false
        }
        document.getElementById('name-err').innerHTML = null
        return true
    }

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

    const submitForm = () => {
        console.log('processing...')
        const validName = validateName()
        const validEmail = validateEmail()
        const validPassword = validatePassword()
        const validRePassword = validateRePassword()
        const shouldFormSubmit = validName && validEmail && validPassword && validRePassword

        if (!shouldFormSubmit) return

        setProcessing(true)
        authAPI.register(name, email, password)
            .then(() => {
                console.log('Successfully register')
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

                        navigate('/')
                    })
            })
            .catch(err => {
                setProcessing(false)
                showErr(err.response.data)
            })
    }

    return (
        <div className={classes.signup}>
            <div className={classes.form}>
                <Link to='/'>
                    <div className={classes.logo}>
                        <img src={logo} alt='logo' />
                        <p>Popcorn</p>
                    </div>
                </Link>

                <div className={classes.title}>
                    <div>Create an account</div>
                    <div>Let&apos;s get started</div>
                </div>

                <input id='name'
                    type='name'
                    name='name'
                    placeholder='Name'
                    onChange={e => setName(e.target.value)}
                    onKeyDown={submitOnEnter}
                />
                <div id='name-err' className={classes.err}></div>
                <input id='email'
                    type='email'
                    name='email'
                    placeholder='Email'
                    autoFocus='autofocus'
                    onChange={e => setEmail(e.target.value)}
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

                <input id='re-password'
                    type='password'
                    name='re-password'
                    placeholder='Repeat password'
                    onChange={e => setRePassword(e.target.value)}
                    onKeyDown={submitOnEnter}
                />
                <div id='repass-err' className={classes.err}></div>

                <div id='err-msg' className={classes.err}></div>

                <button className={classes.signupBtn}
                    onClick={submitForm}>
                    {
                        processing ? <Loading>Please wait</Loading> : 'Create account'
                    }
                </button>

                <div>Already have an account? <b className={classes.login}
                    onClick={() => { navigate('/login') }}>
                    Log in
                </b>
                </div>

            </div>

            <div className={classes.background}>
                <img src={bgURL} alt='use_VPN' />
            </div>
        </div>
    )
}

export default Signup