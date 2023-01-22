import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import './comments.scss'

import reviewAPI from '../../api/serverAPI/reviewAPI'
import CommentCard from '../commentCard/CommentCard'
import apiConfig from '../../api/serverAPI/apiConfig'
import { useRef } from 'react'


const Comments = (props) => {
    const [user, setUser] = useState(null)
    const [comments, setComments] = useState([])
    const [inputCmt, setInputCmt] = useState(null)

    const navigate = useNavigate()
    const inputField = useRef(null)

    useEffect(() => {
        const fetchComments = async () => {
            const res = await reviewAPI.getMovieReviews(props.id)
            setComments(res.data.slice(-10))
        }
        

        fetchComments()
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [props])

    const handlerComment = e => {
        if (e.key === 'Enter') {
            postComment()
        }
    }

    const postComment = () => {
        if (inputCmt === null || inputCmt === '') return
        const token = localStorage.getItem('token')
        
        if (token) {
            const commentId = `${user.id}${Date.now()}`
            const newComment = { 
                id: commentId,
                time: new Date().toISOString(),
                avatar: user.avatar,
                content: inputCmt,
                email: user.email,
                user_id: user.id,
                movie_id: props.id, 
                role: user.role,
                user_name: user.name
            }
            setComments([...comments, newComment])
            reviewAPI.adddReview(commentId, props.id, inputCmt, token)
            .then(
                res => {
                    console.log(res.data.message)
                }
            ).catch(err => {
                console.log(err)
            })
            setInputCmt('')
            inputField.current.value = ''
        }
    }

    const OnDeleteComment = (i) => {
        setComments(comments.filter(cmt => cmt.id != i))
    }

    const onEditSuccess = async () => {
        const res = await reviewAPI.getMovieReviews(props.id)
        setComments(res.data.slice(-10))
    }

    return (
        <div className='comments'>
            <h2>Comments</h2>

            <div className="comments_list">
                {
                    comments.map((item, i) => (
                        <CommentCard item={item}
                            key={i}
                            onDelete={() => OnDeleteComment(item.id)}
                            onEditSuccess={onEditSuccess}
                        ></CommentCard>
                    ))
                }

                
            </div>

            <div className="comments__input">
                {
                    user ?
                        <>
                            <img src={apiConfig.imgURL(user.avatar)}></img>
                            <input type='text'
                                ref={inputField}
                                placeholder='Leave a comment...'
                                onKeyDown={handlerComment}
                                onChange={e => setInputCmt(e.target.value)}
                            ></input>
                            <button onClick={postComment}>Submit</button>
                        </> : <p>Please <a onClick={() => navigate('/login')}><b>log in</b>
                        </a> or <a onClick={() => navigate('/signup')}><b>sign up</b></a> to comment</p>}
            </div>
        </div>
    )
}

Comments.propTypes = {
    id: PropTypes.string.isRequired
}

export default Comments