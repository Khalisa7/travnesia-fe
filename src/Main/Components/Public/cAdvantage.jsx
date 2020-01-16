import React, { Component } from 'react'
import './style/sAdvantage.css'

class CAdvantage extends Component {
  render () {
    return (
      <div className='container-fluid a-background'>
        <div className='row justify-content-center'>
          <div className='col-md-2 col-6'>
            <div className='text-center'>
              <div className='card a-card'>
                <img src='https://image.flaticon.com/icons/svg/180/180995.svg' alt='' />
                <p>+1000 Tour Packets</p>
              </div>
            </div>
          </div>
          <div className='col-md-2 col-6'>
            <div className='text-center'>
              <div className='card a-card'>
                <img src='https://image.flaticon.com/icons/svg/950/950268.svg' alt='' />
                <p>Monitoring Help</p>
              </div>
            </div>
          </div>
          <div className='col-md-2 col-6'>
            <div className='text-center'>
              <div className='card a-card'>
                <img src='https://image.flaticon.com/icons/svg/950/950282.svg' alt='' />
                <p>Best Price</p>
              </div>
            </div>
          </div>
          <div className='col-md-2 col-6'>
            <div className='text-center'>
              <div className='card a-card'>
                <img src='https://image.flaticon.com/icons/svg/950/950295.svg' alt='' />
                <p>Verified Agents</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CAdvantage
