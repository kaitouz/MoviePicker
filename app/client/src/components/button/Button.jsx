import React from 'react'
import PropTypes from 'prop-types'

import './button.scss'

const Button = props => {
  return (
    <button
      className='btn'
      onClick={props.onClick}
    >
      {props.name}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string
}

export default Button