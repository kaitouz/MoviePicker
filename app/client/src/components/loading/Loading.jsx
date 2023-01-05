import React from 'react'
import PropTypes from 'prop-types'

import './loading.scss'
import spinner from '../../assets/spinner-third.png'

const Loading = props => {
  return (
      <div className='loading'>{props.children} <img src={spinner} style={props.children ? {marginLeft: '1rem'}: null}></img></div>
  )
}

Loading.propTypes = {
    children: PropTypes.any
}

export default Loading