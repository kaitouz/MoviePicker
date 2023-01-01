import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import './comments.scss'

import reviewAPI from '../../api/serverAPI/reviewAPI'
import CommentCard, { PseudoComment } from '../commentCard/CommentCard'


const Comments = (props) => {
    const [user, setUser] = useState(null)
    const [comments, setComments] = useState([])
    const [inputCmt, setInputCmt] = useState(null)
    const [processPosting, setProcessPosting] = useState(false)

    const navigate = useNavigate()

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
            
            setProcessPosting(true)
            reviewAPI.adddReview(props.id, inputCmt, token)
            .then(
                res => {
                    
                    const newComment = {
                        ...res.data.result,
                        time: new Date().toISOString(),
                        avatar: user.avatar,
                        email: user.email,
                        user_id: user.id,
                        role: user.role,
                        user_name: user.name
                    }
                    console.log([...comments, newComment])
                    
                    setComments([...comments, newComment])
                    setProcessPosting(false)
                }
            ).catch(err => {
                setProcessPosting(false)
                console.log(err)
            })
            setInputCmt('')
            const inputField = document.getElementById('comment-field')
            inputField.value = ''
        }
    }

    const onDeleteSuccess = (i) => {
        setComments(comments.filter(cmt => cmt.id != i))
    }

    const onEditSuccess = async () => {
        const res = await reviewAPI.getMovieReviews(props.id)
        setComments(res.data)
    }

    return (
        <div className='comments'>
            <h2>Comments</h2>

            <div className="comments_list">
                {
                    comments.map((item, i) => (
                        <CommentCard item={item}
                            key={i}
                            onDeleteSuccess={() => onDeleteSuccess(item.id)}
                            onEditSuccess={onEditSuccess}
                        ></CommentCard>
                    ))
                }

                
            </div>

            {
                processPosting ? <PseudoComment></PseudoComment> : null
            }

            <div className="comments__input">
                {
                    user ?
                        <>
                            <input type='text'
                                placeholder='Leave a comment...'
                                id='comment-field'
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