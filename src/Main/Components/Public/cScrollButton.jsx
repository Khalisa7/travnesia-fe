import React, { Component } from 'react'
import './style/sScrollButton.css'

class CScrollButton extends Component {
  constructor () {
    super()

    this.state = {
      intervalId: 0
    }
  }

  scrollStep () {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId)
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx)
  }

  scrollToTop () {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs)
    this.setState({ intervalId: intervalId })
  }

  render () {
    return (
      <div>
        <button title='Back to top' className='scroll'
          onClick={() => { this.scrollToTop() }}>
          <span className='arrow-up fa fa-chevron-up' />
        </button>
      </div>
    )
  }
}

export default CScrollButton
