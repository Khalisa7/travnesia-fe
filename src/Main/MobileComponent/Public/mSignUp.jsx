import React, { Component } from 'react'
import './style/sMobileSignUp.css'
import Recaptcha from 'react-recaptcha'
import AuthService from '../../../_services/customers/AuthService'
import AccessControl from '../../../_config/middleware/AccessControl'
import Alert from '../../../_services/alert/Alert'
import $ from 'jquery'
import Translations from '../../../localization/translations.js'
import LocalizedStrings from 'react-localization'


class CSignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mobile: false,
            username: '',
            password: '',
            confpassword: '',
            firstname: '',
            lastname: '',
            gcaptcha: false,
            disabledButton: false,
            loaderButton: false
        }
        this.AccessControl = new AccessControl()
        this.Auth = new AuthService()
        this.Alert = new Alert()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this)
        this.verifyCallback = this.verifyCallback.bind(this)

        //Translations
        this.Translations = new Translations()
        var Locale = this.Translations.locale()
        this.lang = new LocalizedStrings({ Locale })
    }

    handleSubmit(event) {
        event.preventDefault()

        if (!this.state.gcaptcha) {
            if (this.state.password != this.state.confpassword) return this.Alert.error('Gagal', 'Konfirmasi Password tidak sama')

            this.setState({ disabledButton: true, loaderButton: 'fa fa-spinner fa-spin' })
            this.Auth.register(
                this.state.username, this.state.password, this.state.confpassword, this.state.firstname, this.state.lastname
            )
                .then(res => {
                    this.setState({ disabledButton: false, loaderButton: false })
                    this.captchaDemo.reset()
                    this.Alert.success('Sukses', 'Pendaftaran Berhasil, Silahkan Cek Email anda.')
                    setTimeout(2000)
                    // window.location = '/'
                })
                .catch(err => {
                    this.setState({ disabledButton: false, loaderButton: false })
                    this.captchaDemo.reset()
                    this.Alert.error('Gagal', 'Email ' + this.state.username + ' sudah digunakan.')
                })
        } else {
            this.setState({ disabledButton: false, loaderButton: false })
            this.Alert.error('Gagal', 'Anda harus memverifikasi reCaptcha')
        }
    }

    onLoadRecaptcha() {
        if (this.captchaDemo) {
            this.captchaDemo.reset()
        }
    }

    verifyCallback(recaptchaToken) {
        if (recaptchaToken) { this.setState({ gcaptcha: true }) }
    }

    componentDidMount() {
        if (this.AccessControl.loggedIn() == true) {
            window.location = '/'
        }

        if (this.captchaDemo) {
            this.captchaDemo.reset()
        }

    }


    render() {
        return (
            <div className='signUp-mobile'>
                <div className='container pt-4 background-sign-up'>
                    <div className='row justify-content-end'>
                        <div className='col-md-5'>
                            <div className='card shadow mb-4 border-0'>
                                <div className='card-body bg-white'>
                                    <div className='page-heading text-center'>
                                        <img style={{ width: 200 + 'px' }} src={process.env.REACT_APP_LOGO} alt='Tripdize Logo' />
                                        <p>{this.lang.signup_title}</p>
                                    </div>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className='form-row'>
                                            <div className='form-group col-md-12'>
                                                <label htmlFor=''>{this.lang.signup_firstname}</label>
                                                <div className='input-group'>
                                                    <div className='input-group-prepend'>
                                                        <span className='input-group-text primary-color'>
                                                            <i className='fa fa-fw fa-user f-white' />
                                                        </span>
                                                    </div>
                                                    <input
                                                        type='text'
                                                        className='form-control'
                                                        placeholder='Nama Awal'
                                                        required
                                                        onChange={(ev) => this.setState({ firstname: ev.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className='form-group col-md-12'>
                                                <label htmlFor=''>{this.lang.signup_lastname}</label>
                                                <div className='input-group'>
                                                    <div className='input-group-prepend'>
                                                        <span className='input-group-text primary-color'>
                                                            <i className='fa fa-fw fa-user f-white' />
                                                        </span>
                                                    </div>
                                                    <input
                                                        type='text'
                                                        className='form-control'
                                                        placeholder='Nama Akhir'
                                                        required
                                                        onChange={(ev) => this.setState({ lastname: ev.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className='form-group col-md-12'>
                                                <label>{this.lang.email}</label>
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
                                                        onChange={(ev) => this.setState({ username: ev.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className='form-group col-md-12'>
                                                <label>{this.lang.password}</label>
                                                <div className='input-group'>
                                                    <div className='input-group-prepend primary color'>
                                                        <span className='input-group-text primary-color'>
                                                            <i className='fa fa-fw fa-lock f-white' />
                                                        </span>
                                                    </div>
                                                    <input
                                                        type='password'
                                                        className='form-control'
                                                        placeholder='Password'
                                                        required
                                                        onChange={(ev) => this.setState({ password: ev.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className='form-group col-md-12'>
                                                <label>{this.lang.signup_confirm_pass}</label>
                                                <div className='input-group'>
                                                    <div className='input-group-prepend primary color'>
                                                        <span className='input-group-text primary-color'>
                                                            <i className='fa fa-fw fa-lock f-white' />
                                                        </span>
                                                    </div>
                                                    <input
                                                        required type='password'
                                                        className='form-control'
                                                        placeholder='Confirm Password'
                                                        required
                                                        onChange={(ev) => this.setState({ confpassword: ev.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text-center'>
                                            <div className='text-center captcha'>
                                                <Recaptcha
                                                    sitekey='6LcYjX4UAAAAAER1GnHgmgd49e2Pmi2kiB6n0NAv'
                                                    onloadCallback={this.onLoadRecaptcha}
                                                    verifyCallback={this.verifyCallback}
                                                    ref={(el) => { this.captchaDemo = el }}
                                                    render='explicit'
                                                    theme='white'
                                                />
                                            </div>
                                            <div className='form-group col-12'>
                                                <button className='btn btn-warning  btn-block' disabled={this.state.disabledButton}><i /> {this.lang.register}</button>
                                            </div>
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

export default CSignUp
