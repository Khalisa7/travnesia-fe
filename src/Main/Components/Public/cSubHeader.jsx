import React, { Component } from 'react'
import './style/sSubHeader.css'

class CSubHeader extends Component {
  render () {
        return (
            <div className='header_pages'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-md-12 col-12 mt-5 header_caption'>
                            <span className='badge badge-warning'><h1 className="text-white px-4">Liburan Kemana saja ?</h1></span> 
                            <h5><span className='badge text-white badge-warning'>SEMUANYA ADA</span></h5>
                            <blockquote className='text-white blockquote mb-2'>
                                Tiap sudut menyapaku bersahabat penuh selaksa makna<br />
                                Terhanyut aku akan nostalgia, saat ku sering luangkan waktu, untuk mengunjungi Tripdize<br />
                                Mencari Paket Liburan terbaru dan termurah yang pernah ada.
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CSubHeader
