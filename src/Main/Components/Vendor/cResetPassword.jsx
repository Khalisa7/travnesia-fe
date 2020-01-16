import React, { Component, Fragment } from 'react'
import './style/sResetPassword.css'
import Recaptcha from 'react-recaptcha'
import AuthService from '../../../_services/customers/AuthService'
import Alert from '../../../_services/alert/Alert'
import $ from 'jquery'
import Translations from '../../../localization/translations.js'
import LocalizedStrings from 'react-localization'
import queryString from 'query-string'
import Axios from 'axios';


export default class CResetPassword extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            resource: this.props.params.resource,
            locator: this.props.params.locator,
            hash: this.props.params.hash,
            success: 0,
            loading: true,
        }

        this.Auth = new AuthService()
        this.Alert = new Alert()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this)
        this.verifyCallback = this.verifyCallback.bind(this)

        //Translations
        this.Translations = new Translations()
        var Locale = this.Translations.locale()
        this.lang = new LocalizedStrings({Locale})
        this.params = queryString.parse(window.location.search)

    }

    handleSubmit(event) {
        event.preventDefault()

        if (!this.state.gcaptcha) {
            if (this.state.password != this.state.confpassword) return this.Alert.error('Gagal', 'Konfirmasi Password tidak sama')

            this.setState({ disabledButton: true, loaderButton: 'fa fa-spinner fa-spin' })
            return Axios({
                url: process.env.REACT_APP_ENDPOINT + 'vendor/_password',
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                data: {
                    resource: this.state.resource,
                    locator: this.state.locator,
                    hash: this.state.hash,
                    password: this.state.password,
                    retype_password: this.state.confpassword
                }
            }).then(res => {
                this.Alert.success('Berhasil', 'Password Berhasil diubah')
                setTimeout(()=>{window.location = process.env.PUBLIC_URL + 'partner'},3000)
            }).catch(err => {
                this.Alert.error('Kesalahan', 'Maaf terjadi kesalahan! Password gagal diubah')
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
        // console.log(this.props)
        if (this.captchaDemo) {
            this.captchaDemo.reset()
        }

    }


    render () {
        if(!this.params.resource || !this.params.locator || !this.params.hash){
            window.location = '/'
        }else {
            return (
                <Fragment>
            <div className='reset-password'>
                <div className='container pt-4 background-sign-up'>
                <div className='row justify-content-center'>
                    <div className='col-md-5'>
                    <div className='card shadow mb-4 border-0'>
                        <div className='card-body bg-white'>
                        <div className='page-heading text-center'>
                            <img style={{ width: 200 + 'px' }} src={process.env.REACT_APP_LOGO} alt='Tripdize Logo' />
                            <p>{this.lang.reset_password_title}</p>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className='form-row'>
                            <div className='form-group col-md-12'>
                                <label>{this.lang.reset_new_password}</label>
                                <div className='input-group'>
                                <div className='input-group-prepend primary color'>
                                    <span className='input-group-text primary-color'>
                                    <i className='fa fa-fw fa-lock f-white' />
                                    </span>
                                </div>
                                <input
                                    type='password'
                                    className='form-control'
                                    placeholder='New Password'
                                    required
                                    onChange={(ev) => this.setState({ password: ev.target.value })}
                                />
                                </div>
                            </div>
                            <div className='form-group col-md-12'>
                                <label>{this.lang.reset_confirm_password}</label>
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
                                <button className='btn btn-warning  btn-block' disabled={this.state.disabledButton}><i/> {this.lang.reset_password}</button>
                            </div>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </Fragment>
            )
        }   
    }
}

