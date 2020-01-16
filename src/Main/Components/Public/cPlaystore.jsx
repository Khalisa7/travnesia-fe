import React, { Component } from 'react'
import './style/sPlaystore.css'
import Translations from './../../../localization/translations.js'
import LocalizedStrings from 'react-localization'

class CPlaystore extends Component {
    constructor (props) {
        super(props)
        this.state = {
        mobile : false
        }

        //Translations
        this.Translations = new Translations()
        var Locale = this.Translations.locale()
        this.lang = new LocalizedStrings({Locale})
        
    }
    render () {
        return (
        <section>
            <div className='playstore' data-original="https://res.klook.com/image/upload/q_60/v1465888536/web3.0/how_to_use.jpg">
                <div className='container'>
                    <div className='row'>
                    <div className='col-md-6 advantage'>
                        <div className='page-heading'>
                        <div className='text-center'>
                            <h3 className='f-white'>{ this.lang.download_app_title }</h3>
                            <div className='hr' /><br />
                            <p>{ this.lang.download_app_desc }</p>
                        </div>
                        </div>
                        <div className='row'>
                        <div className='col-md-3 col-6 mb-4'>
                            <div className='text-center'>
                            <div className='card a-card'>
                                <img src='https://image.flaticon.com/icons/svg/180/180995.svg' alt='' />
                                <p>+1000 Tour</p>
                            </div>
                            </div>
                        </div>
                        <div className='col-md-3 col-6 mb-4'>
                            <div className='text-center'>
                            <div className='card a-card'>
                                <img src='https://image.flaticon.com/icons/svg/950/950268.svg' alt='' />
                                <p>Monitoring</p>
                            </div>
                            </div>
                        </div>
                        <div className='col-md-3 col-6 mb-4'>
                            <div className='text-center'>
                            <div className='card a-card'>
                                <img src='https://image.flaticon.com/icons/svg/950/950282.svg' alt='' />
                                <p>Best Price</p>
                            </div>
                            </div>
                        </div>
                        <div className='col-md-3 col-6 mb-4'>
                            <div className='text-center'>
                            <div className='card a-card'>
                                <img src='https://image.flaticon.com/icons/svg/950/950295.svg' alt='' />
                                <p>Verified</p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className='col-md-6 text-center playstore-icon'>
                        <img src='https://cdn2.iconfinder.com/data/icons/social-media-8/512/playstore.png' alt='' />
                        <div className='form-group'>
                        <div className='input-group'>
                            <a className='btn btn-danger playstore-btn' href='' >Download Playstore</a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
        )
    }
}

export default CPlaystore
