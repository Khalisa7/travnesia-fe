import React, { Component } from 'react'
import './style/scMailResetPass..css'
import Recaptcha from 'react-recaptcha'
import AuthService from '../../../_services/customers/AuthService'
import Alert from '../../../_services/alert/Alert'
import $ from 'jquery'
import Translations from '../../../localization/translations.js'
import LocalizedStrings from 'react-localization'
import Axios from 'axios';


class CMailResPass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mobile: false,
            username: '',
            gcaptcha: false,
            disabledButton: false,
            loaderButton: false
        }
        this.Auth = new AuthService()
        this.Alert = new Alert()
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this)
        this.verifyCallback = this.verifyCallback.bind(this)
        this.sendMail = this.sendMail.bind(this)
        //Translations
        this.Translations = new Translations()
        var Locale = this.Translations.locale()
        this.lang = new LocalizedStrings({ Locale })
    }


    onLoadRecaptcha() {
        if (this.captchaDemo) {
            this.captchaDemo.reset()
        }
    }

    verifyCallback(recaptchaToken) {
        if (recaptchaToken) { this.setState({ gcaptcha: true }) }
    }

    sendMail(e) {
        e.preventDefault()
        return Axios({
            url: process.env.REACT_APP_ENDPOINT + 'vendor/password',
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            data: {
                email: this.state.username
            }
        }).then(res => {
            this.Alert.success('Sukses', 'Permohonan Berhasil Terkirim, Silahkan Cek Email Anda')
        }).catch(err => {
            this.Alert.error('Gagal', 'Email ' + this.state.username + ' Tidak Terdaftar')
        })
    }

    componentDidMount() {
        if (this.captchaDemo) {
            this.captchaDemo.reset()
        }

    }

    render() {
        return (
            <div className='mail-reset-password'>
                <div className='container pt-4 background-sign-up'>
                    <div className='row justify-content-center'>
                        <div className='col-md-7'>
                            <div className='card shadow mb-4 border-0'>
                                <div className='card-body bg-white'>
                                    <div className='page-heading text-center'>
                                        <img style={{ width: 200 + 'px' }} src={process.env.REACT_APP_LOGO} alt='Tripdize Logo' />
                                        <br></br>
                                        <br></br>
                                    </div>
                                    <form onSubmit={e => this.sendMail(e)}>
                                        <div className='form-row'>
                                            <div className='form-group col-md-12'>
                                                <h5>Forgot your password?</h5>
                                                <label>{this.lang.forgot_pass_inst}</label>
                                                <div className='input-group'>
                                                    <div className='input-group-prepend primary color'>
                                                        <span className='input-group-text primary-color'>
                                                            <i className='fa fa-fw fa-envelope f-white' />
                                                        </span>
                                                    </div>
                                                    <input
                                                        type='email'
                                                        className='form-control'
                                                        placeholder='Email'
                                                        required
                                                        onChange={(ev) => {this.setState({ username: ev.target.value })
                                                        console.log(this.state.username)    
                                                    }}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                        {/* <div className=''>
                                            <div className='captcha'>
                                                <Recaptcha
                                                    sitekey='6LcYjX4UAAAAAER1GnHgmgd49e2Pmi2kiB6n0NAv'
                                                    onloadCallback={this.onLoadRecaptcha}
                                                    verifyCallback={this.verifyCallback}
                                                    ref={(el) => { this.captchaDemo = el }}
                                                    render='explicit'
                                                    theme='white'
                                                />
                                            </div>
                                        </div> */}

                                        <div className=''>
                                            <button className='btn btn-warning  btn-block' disabled={this.state.disabledButton}><i /> {this.lang.mail_send}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CMailResPass
