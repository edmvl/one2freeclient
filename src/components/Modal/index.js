import React from 'react'
import PropTypes from 'prop-types'

class Model extends React.Component {
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

Model.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node,
}

export default Model
