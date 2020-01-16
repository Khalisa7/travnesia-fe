import React, { Component } from 'react'
import './style/sError.css'
import startup from './img/startup.png'

class C404 extends Component {
  render () {
    return (
      <section className='_error'>
        <div className='container'>
          <div className='col-md-12'>
            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <div className='title'>
                  <h2>Something Went Wrong !</h2>
                </div>
                <div className='content'>
                  <p>Sorry, we're got a problem and our team <br />
                    is trying hard to handling it.<br />
					You'll redirected in 3 second....
                  </p>
                </div>
              </div>

              <div className='col-md-4'>
                <img src={startup} alt='' />
                <h1 className='text-center'>We got down</h1>
              </div>
            </div>

          </div>
        </div>

      </section>
    )
  }
}

export default C404
