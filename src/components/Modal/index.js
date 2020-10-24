import React from 'react'
import PropTypes from 'prop-types'

class Modal extends React.Component {
  render() {
    if (!this.props.show) {
      return null
    }

    return (
      <>
        {this.props.children}
      </>
    )
  }
}

Modal.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node,
}

export default Modal
