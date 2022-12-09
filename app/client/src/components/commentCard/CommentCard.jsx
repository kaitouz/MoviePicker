import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

import './commentCard.scss'

import userAPI from '../../api/serverAPI/userAPI'
import reviewAPI from '../../api/serverAPI/reviewAPI'

const CommentCard = (props) => {
  const item = props.item
  const user = JSON.parse(localStorage.getItem('user'))
  const [reviewer, setReviewer] = useState(null)

  const content = useRef(null)

  useEffect(() => {
    userAPI.getUserInfo(item.user_id).then(res => {
      setReviewer(res.data)
    })
  }, [])

  const deleteComment = () => {
    const token = localStorage.getItem('token')
    if (token) {
      reviewAPI.deleteReview(item.id, token).then(() => {
        if (props.onDeleteSuccess) props.onDeleteSuccess()
      }).catch(err => console.log(err))
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

  return (
    <div className="comment-card">
      <div className="comment-card__button">
        {user && reviewer && reviewer.id === user.id ?
          <div className="edit" onClick={editComment}>
            <p>Edit</p>
            <FaEdit />
          </div> : null
        }
        {user && reviewer && (reviewer.id === user.id || user.role === 'admin') ?
          <div className="delete" onClick={deleteComment}>
            <FaTrashAlt />
            <p>Delete</p>
          </div> : null
        }
      </div>
      <div className="comment-card__header">
        <h3>{reviewer ? reviewer.name : ''}</h3>
        {
          reviewer && reviewer.role === 'admin' ?
            <div className="role"> {reviewer.role} </div>
            : null
        }
      </div>
      <div className='comment-card__time'>
        {`${(new Date(item.time)).toDateString()} 
        at ${(new Date(item.time)).toLocaleTimeString()}`}
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
  )
}

CommentCard.propTypes = {
  item: PropTypes.object.isRequired,
  onDeleteSuccess: PropTypes.func,
  onEditSuccess: PropTypes.func
}

export default CommentCard