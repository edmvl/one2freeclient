import React from 'react'
import PropTypes from 'prop-types'

class Index extends React.Component {
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

Index.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
}

export default Index
