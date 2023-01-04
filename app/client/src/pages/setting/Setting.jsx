import React, { useState, useEffect } from 'react'
import axios from 'axios';

import './setting.scss'

import apiConfig from '../../api/serverAPI/apiConfig';
import { useNavigate } from 'react-router-dom';
import userAPI from '../../api/serverAPI/userAPI';
import { useRef } from 'react';
import { FaTrash } from 'react-icons/fa';
import Loading from '../../components/loading/Loading';


//import userAPI from '../../api/serverAPI/userAPI';

const Setting = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [user, setUser] = useState(null)
    const [password, setPassword] = useState(null)
    const [rePassword, setRePassword] = useState(null)
    const [userName, setUserName] = useState(null)
    const [processUpload, setProcessUpload] = useState(false)

    const navigate = useNavigate()
    const userNameInput = useRef(null)


    useEffect(() => {
        const current_user = localStorage.getItem('user')
        if (!current_user) navigate('/login')
        setUser(JSON.parse(current_user))
    }, [])

    const upload = async () => {
        if (selectedImage) {
            const token = localStorage.getItem('token')
            if (!token) return
            const formData = new FormData();
            formData.append("image", selectedImage);

            setProcessUpload(true)
            axios({
                method: "post",
                url: `${apiConfig.baseURL}/user/upload-avatar`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data", "x_authorization": token },
            })
                .then(res => {
                    console.log('ok')
                    const user = JSON.parse(localStorage.getItem('user'))
                    user.avatar = res.data.avatar
                    localStorage.setItem('user', JSON.stringify(user))
                    navigate(0)
                })
                .catch(err => {
                    setProcessUpload(false)
                    console.log(err)
                });

        }
    }

    const changePassword = (e) => {
        e.preventDefault();
        if (isMatch()) {
            const token = localStorage.getItem('token')
            if (!token) navigate('/login')
            userAPI.resetPassword(password, token)
                .then(() => cancelChange())
                .catch(err => {
                    console.log(err)
                    navigate('/login')
                })
        }
    }

    const cancelChange = () => {
        const form = document.getElementById('password-reset-form')
        const passwordInput = form.querySelector('.password input')
        const rePasswordInput = form.querySelector('.repassword input')
        passwordInput.value = ''
        rePasswordInput.value = ''
        setPassword('')
        setRePassword('')
    }

    const changeUserName = () => {
        if (!userName) return
        if (userName.trim() === '') return
        if (user.name === userName) return
        const token = localStorage.getItem('token')
        if (!token) navigate('/login')
        userAPI.changeUsername(userName.trim(), token)
        .then(() => {
            const currUser = user
            currUser.name = userName.trim()
            setUser(currUser)
            setUserName(null)
            localStorage.setItem('user', JSON.stringify(currUser))
        })
    }

    const cancelEditUserName = () => {
        userNameInput.current.value = user.name
        setUserName(user.name)
    }

    const isMatch = () => {
        if (!(password && rePassword)) return false
        if (password === '') return false
        if (password !== rePassword) return false
        if (password.length > 16 || password.length < 6) return false
        return true 
    }

    return (
        <>
            {user ? <div className='setting'>
                <div className='setting__avatar'>
                    <h2>Upload profile image</h2>
                    <div className='setting__avatar__preview'>
                        <img alt="Only accept .png, .jpeg, .gif" width={"250px"}
                            src={selectedImage ? URL.createObjectURL(selectedImage) : apiConfig.imgURL(user.avatar)}
                            accept="image/png, image/gif, image/jpeg, image/jpg" />

                        {selectedImage && 
                            <div className='imgName'>{selectedImage.name} 
                                <div className='trash' onClick={() => setSelectedImage(null)}><FaTrash/></div></div>}
                    </div>    

                    <input
                        style={{display: 'none'}}
                        id='updateimg'
                        type="file"
                        name="myImage"
                        onChange={(event) => {
                            setSelectedImage(event.target.files[0]);
                        }}
                    />

                    <label htmlFor='updateimg'>Choose file</label>
                    {selectedImage ? <>
                        <button onClick={upload}>Upload</button> 
                        {processUpload ? <Loading/> : null}    
                    </> : null}
                </div>
                <div className="setting__info">
                    <h1>Setting</h1>

                    <div className='setting__info__basic'>
                        <h2>General information:</h2>
                        <div className='setting__info__basic__data'>
                            <div className='row'>
                                <div className='left'>ID</div>
                                <div className='right'><input type='text' defaultValue={user.id} disabled></input></div>
                            </div>
                            <div className='row name'>
                                <div className='left'>Name</div>
                                <div className='right'>
                                    <input type='text'
                                        ref={userNameInput}
                                        defaultValue={user.name}
                                        onChange={(e) => setUserName(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='left'>Email</div>
                                <div className='right'><input type='text' defaultValue={user.email} disabled></input></div>
                            </div>
                            <div className='row'>
                                <div className='left'>Role</div>
                                <div className='right'><input type='text' defaultValue={user.role} disabled></input></div>
                            </div>
                            <div className="btns">
                                <button className='saveBtn' onClick={changeUserName}>Update</button>
                                <button className='cancelBtn' onClick={cancelEditUserName}>Cancel</button>
                            </div>
                        </div>
                        
                    </div>

                    <div className='setting__info__basic'>
                        <h2>Change password:</h2>

                        <form id="password-reset-form" className='setting__info__basic__data' autoComplete="off">
                            <div className="row password">
                                <label className='left'>Password</label>
                                <input type="password"
                                    className='right'
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div className="row repassword">
                                <label className='left'>Repeat password</label>
                                <input type="password"
                                    className='right'
                                    onChange={e => setRePassword(e.target.value)} />
                            </div>

                            {
                                (
                                    password && rePassword &&
                                    password !== '' && rePassword !== ''
                                ) ? (
                                    <div className="alert">{(password.length > 16 || password.length < 6) ? 'Password length must be between 6 and 16 characters' : (
                                        password !== rePassword ? 'Repeat password does not match.' : null
                                    )}</div>
                                ) : null
                            }
                            {
                                password && rePassword &&
                                <div className="btns">
                                    <button onClick={changePassword} className={`saveBtn ${isMatch() ? null : 'inactive'}`}>Save</button>
                                    <button onClick={cancelChange} className='cancelBtn' >Cancel</button>
                                </div>
                            }
                        </form>

                    </div>
                </div>
            </div> : null
            }
        </>
    )
}

export default Setting