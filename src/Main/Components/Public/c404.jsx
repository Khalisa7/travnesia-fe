import React, { Component } from 'react'
import './style/s404.css'
import startup from './img/startup.png'

class C404 extends Component {
  render () {
    return (
      <section className='_404'>
        <div className='container'>
          <div className='col-md-11'>
            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <div className='title'>
                  <h2>Halaman tidak ditemukan !</h2>
                </div>
                <div className='content'>
                  <p>Terima kasih atas kunjungan Anda.<br />
                                    Maaf, halaman ini tidak ada atau telah dialihkan.
                  </p>
                </div>
              </div>

              <div className='col-md-4'>

                <img src={startup} alt='' />
                <h1 className='text-center'>Oops, error 404!</h1>
              </div>
            </div>

          </div>
        </div>

      </section>
    )
  }
}

export default C404
