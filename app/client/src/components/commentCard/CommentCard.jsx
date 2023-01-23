import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import moment from 'moment'

import './commentCard.scss'

import reviewAPI from '../../api/serverAPI/reviewAPI'
import Loading from '../loading/Loading'
import defaultAvatar from '../../assets/default_avt.png'
import apiConfig from '../../api/serverAPI/apiConfig'

const CommentCard = (props) => {
  const item = props.item
  const user = JSON.parse(localStorage.getItem('user'))

  const content = useRef(null)


  const deleteComment = () => {
    const token = localStorage.getItem('token')
    if (token) {
      if (props.onDelete) props.onDelete()
      reviewAPI.deleteReview(item.id, token).then(() => {
        console.log('success', item.id)
        if (props.onDeleteSuccess) props.onDeleteSuccess()
      }).catch(err => {
        console.log(err)
      })
    }
  }

  const editComment = () => {
    content.current.classList.add('editable')
    const span = content.current.querySelector('.comment-card__content__edit span')
    setEndOfContenteditable(span)
  }

  const submitEditedComment = () => {
    content.current.classList.remove('editable')
    const span = content.current.querySelector('.comment-card__content__edit span')

    if (span.textContent === '') return console.log('return')

    content.current.querySelector('p').textContent = span.textContent
    const token = localStorage.getItem('token')

    if (token) {
      reviewAPI.editReview(item.id, span.textContent, token).then(() => {
        if (props.onEditSuccess) props.onEditSuccess()
      }).catch(err => console.log(err))
    }
  }

  const discarEditedComment = () => {
    content.current.classList.remove('editable')
    const span = content.current.querySelector('.comment-card__content__edit span')
    span.textContent = item.content
  }

  const setEndOfContenteditable = (contentEditableElement) => {
    let range, selection;
    range = document.createRange()
    range.selectNodeContents(contentEditableElement)
    range.collapse(false)
    selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
  }

  const time = `${(new Date(item.time)).toDateString()} 
        at ${(new Date(item.time)).toLocaleTimeString()}`

  return (
    <div className="comment-card">
      <div className="comment-card__avatar">
        <img src={apiConfig.imgURL(item.avatar) || defaultAvatar}></img>
      </div>
      <div>
        <div className="comment-card__button">
          {(user && item.user_id === user.id) ?
            <div className="edit" onClick={editComment}>
              <p>Edit</p>
              <FaEdit />
            </div> : null
          }
          {(user && (item.user_id === user.id || user.role === 'admin')) ?
            <div className="delete" onClick={deleteComment}>

              <FaTrashAlt />
              <p>Delete</p>

            </div> : null
          }
        </div>
        <div className="comment-card__header">
          <h3>{item.user_name}</h3>
          {
            item.role === 'admin' ?
              <div className="role"> {item.role} </div>
              : null
          }
        </div>
        <div className='comment-card__time' name={time}>
          <p>{moment(item.time).fromNow()}</p>
        </div>
        <div ref={content} className="comment-card__content">
          <p>{item.content}</p>
          <div className="comment-card__content__edit">
            <div><span
              contentEditable='true'
              suppressContentEditableWarning={true}

              onKeyDown={(e) => {
                if (e.key === 'Enter') submitEditedComment()
              }}
            >{item.content}</span></div>
            <button onClick={submitEditedComment}>Save</button>
            <button onClick={discarEditedComment}>Discard</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const PseudoComment = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <>
      {user ? <div className="comment-card">
        <div className="comment-card__avatar">
          <img src={apiConfig.imgURL(user.avatar) || defaultAvatar}></img>
        </div>
        <div>
          <div className="comment-card__button">
            <div className="edit">
              <p>Edit</p>
              <FaEdit />
            </div>

            <div className="delete">
              <FaTrashAlt />
              <p>Delete</p>
            </div>
          </div>
          <div className="comment-card__header">
            <h3>{user.name}</h3>
            {
              user.role === 'admin' ?
                <div className="role"> {user.role} </div>
                : null
            }
          </div>
          <div className='comment-card__time'>
            Just now
          </div>
          <div className="comment-card__content">
            <div className='pseudo-comment'>
              <Loading>Posting</Loading>
            </div>
          </div>
        </div>
      </div> : null}
    </>


  )

}

CommentCard.propTypes = {
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onDeleteSuccess: PropTypes.func,
  onEditSuccess: PropTypes.func
}

export default CommentCard