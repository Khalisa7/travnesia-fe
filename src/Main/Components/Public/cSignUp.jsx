import React, { Component } from "react"
import "./style/sSignUp.css"
import Recaptcha from "react-recaptcha"
import AuthService from "../../../_services/customers/AuthService"
import AccessControl from "../../../_config/middleware/AccessControl"
import Alert from "../../../_services/alert/Alert"
import Translations from "../../../localization/translations.js"
import LocalizedStrings from "react-localization";
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'


class CSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Mobile validation state
      mobile: false,

      //Payload
      username: "",
      password: "",
      confpassword: "",
      firstname: "",
      lastname: "",


      gcaptcha: false,
      disabledButton: false,
      loaderButton: false,
      loader: true,

      //Form Validation
      fields: {},
      errors: {},
      invalid: '',
    };

    this.AccessControl = new AccessControl();
    this.Auth = new AuthService();
    this.Alert = new Alert();

    //Form and Captcha handling
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);

    //Translations
    this.Translations = new Translations();
    var Locale = this.Translations.locale();
    this.lang = new LocalizedStrings({ Locale });
  }


  componentDidMount() {
    //Check User session
    if (this.AccessControl.loggedIn() == true) {
      window.location = "/"; // if login, redirect to home
    }
    //Reset captcha
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
    //Disable loader
    setTimeout(() => this.setState({ loader: false }), 900)
  }

  handleSubmit(event) {
    event.preventDefault();
    //Get filed state to send payload
    let fields = this.state.fields

    //Enable Loader
    this.setState({ loader: true })

    //Check form validation
    if (this.handleValidation()) { // Execute code below if form valid

      //Check captcha
      if (!this.state.gcaptcha) {
        this.setState({ //Enable spinner in submit button
          disabledButton: true,
          loaderButton: "fa fa-spinner fa-spin"
        })
        //Send Login request with payload
        this.Auth.register(
          fields['email'],
          fields['password'],
          fields['conf_password'],
          fields['first_name'],
          fields['last_name']
        )
          .then(res => { //if Register success
            this.captchaDemo.reset() //Reset captcha
            this.setState({ disabledButton: false, loaderButton: false }) //Disable spiner button
            setTimeout(() => this.setState({ loader: false }), 900) //Disable loader
          })
          .catch(err => {
            //Check if mail already registered
            if (err.response.data.flag.msg === 'mail_was_registered') {
              this.setState({ errors: { 'email': 'Email ' + fields['email'] + ' sudah dipakai' } }) //Set error message
              this.setState({ invalid: { 'email': 'is-invalid' } }) //Set bootstrap form invalid
            } else {

              //Send Alert if error undefined
              this.Alert.error(
                "Oppss...",
                "Tidak dapat memproses permintaan anda. Coba lagi"
              )
            }

            this.captchaDemo.reset() //Reset captcha
            this.setState({ disabledButton: false, loaderButton: false }) //Disable spiner button
            setTimeout(() => this.setState({ loader: false }), 900) //Disable loader
          })
      } else { //if captcha not checked
        this.setState({ disabledButton: false, loaderButton: false }) // Disable spinner button
        this.Alert.error("Gagal", "Anda harus memverifikasi reCaptcha") //send alert to user
        setTimeout(() => this.setState({ loader: false }), 900) // disable loader
      }
    }
  }

  onLoadRecaptcha() {
    //Reset captcha
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }

  //set captcha token callback
  verifyCallback(recaptchaToken) {
    if (recaptchaToken) {
      this.setState({ gcaptcha: true });
    }
  }

  //Form Validation handling
  handleValidation() {
    // Define base variable
    let fields = this.state.fields
    let errors = {}
    let invalid = {}
    let isValid = true

    //Check First Name field
    if (!fields['first_name']) {
      isValid = false
      invalid['first_name'] = 'is-invalid'
      errors['first_name'] = "Nama Awal tidak boleh kosong"
    }

    //Check Last Name field
    if (!fields['last_name']) {
      isValid = false
      invalid['last_name'] = 'is-invalid'
      errors['last_name'] = "Nama Akhir tidak boleh kosong"
    }

    //Check Email field
    if (!fields['email']) {
      isValid = false
      invalid['email'] = 'is-invalid'
      errors['email'] = "Email tidak boleh kosong"
    }

    //Make sure if email is valid
    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        isValid = false;
        invalid['email'] = 'is-invalid'
        errors["email"] = "Alamat Email tidak benar";
      }
    }

    //Check Password field
    if (!fields['password']) {
      isValid = false
      invalid['password'] = 'is-invalid'
      errors['password'] = "Kata sandi tidak boleh kosong"
    }

    //Check Password Length
    if (fields['password'].length < 8) {
      isValid = false
      invalid['password'] = 'is-invalid'
      errors['password'] = "Kata sandi minimal 8 karakter"
    }

    //Check Password confirmation field
    if (!fields['conf_password']) {
      isValid = false
      invalid['conf_password'] = 'is-invalid'
      errors['conf_password'] = "Konfirmasi kata sandi tidak boleh kosong"
    }

    //Make sure if password confirmation is same as password field
    if (fields['conf_password'] && fields['conf_password'] !== fields['password']) {
      isValid = false
      invalid['conf_password'] = 'is-invalid'
      errors['conf_password'] = "Konfirmasi kata sandi tidak sama"
    }

    this.setState({ errors: errors }); // Set state as error messafe
    this.setState({ invalid: invalid }) // Check state as invalid class name bootstrap
    setTimeout(() => this.setState({ loader: false }), 900) // disable loader
    return isValid; // return valid status
  }

  //Handling form change
  handleChange(field, e) {

    //Define fileds state as field
    let fields = this.state.fields
    // Get form value
    fields[field] = e.target.value
    this.setState({ fields }) // set field state
    this.setState({ isProvinceDisable: false }) // Enabled province field
    this.setState({ invalid: { field: ' ' } }) // Disable invalid bootstrap classname
  }

  render() {
    return (
      <div>
        <Loading
          show={this.state.loader}
          color="red"
        />
        <div className="signUp">
          <div className="container pt-4 background-sign-up">
            <div className="row justify-content-end">
              <div className="col-md-5">
                <div className="card shadow mb-4 border-0">
                  <div className="card-body bg-white">
                    <div className="page-heading text-center">
                      <img
                        style={{ width: 200 + "px" }}
                        src={process.env.REACT_APP_LOGO}
                        alt="Tripdize Logo"
                      />
                      <p>{this.lang.signup_title}</p>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <label htmlFor="">{this.lang.signup_firstname}</label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text primary-color">
                                <i className="fa fa-fw fa-user f-white" />
                              </span>
                            </div>
                            <input
                              type="text"
                              className={'form-control ' + this.state.invalid["first_name"]}
                              placeholder="Nama Awal"
                              name="first_name"
                              onChange={this.handleChange.bind(this, 'first_name')}
                            />
                          </div>
                          <small className="text-danger">{this.state.errors["first_name"]}</small>
                        </div>
                        <div className="form-group col-md-12">
                          <label htmlFor="">{this.lang.signup_lastname}</label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text primary-color">
                                <i className="fa fa-fw fa-user f-white" />
                              </span>
                            </div>
                            <input
                              type="text"
                              className={'form-control ' + this.state.invalid["last_name"]}
                              placeholder="Nama Akhir"
                              name="last_name"
                              onChange={this.handleChange.bind(this, 'last_name')}
                            />
                          </div>
                          <small className="text-danger">{this.state.errors["last_name"]}</small>
                        </div>
                        <div className="form-group col-md-12">
                          <label>{this.lang.email}</label>
                          <div className="input-group">
                            <div className="input-group-prepend primary color">
                              <span className="input-group-text primary-color">
                                <i className="fa fa-fw fa-envelope f-white" />
                              </span>
                            </div>
                            <input
                              type="text"
                              className={'form-control ' + this.state.invalid["email"]}
                              placeholder="Email"
                              name="email"
                              onChange={this.handleChange.bind(this, 'email')}
                            />
                          </div>
                          <small className="text-danger">{this.state.errors["email"]}</small>
                        </div>
                        <div className="form-group col-md-12">
                          <label>{this.lang.password}</label>
                          <div className="input-group">
                            <div className="input-group-prepend primary color">
                              <span className="input-group-text primary-color">
                                <i className="fa fa-fw fa-lock f-white" />
                              </span>
                            </div>
                            <input
                              type="password"
                              className={'form-control ' + this.state.invalid["password"]}
                              placeholder="Password"
                              name="password"
                              onChange={this.handleChange.bind(this, 'password')}
                            />
                          </div>
                          <small className="text-danger">{this.state.errors["password"]}</small>
                        </div>
                        <div className="form-group col-md-12">
                          <label>{this.lang.signup_confirm_pass}</label>
                          <div className="input-group">
                            <div className="input-group-prepend primary color">
                              <span className="input-group-text primary-color">
                                <i className="fa fa-fw fa-lock f-white" />
                              </span>
                            </div>
                            <input
                              type="password"
                              className={'form-control ' + this.state.invalid["conf_password"]}
                              placeholder="Confirm Password"
                              name="conf_password"
                              onChange={this.handleChange.bind(this, 'conf_password')}
                            />
                          </div>
                          <small className="text-danger">{this.state.errors["conf_password"]}</small>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-center captcha">
                          <Recaptcha
                            sitekey="6LcYjX4UAAAAAER1GnHgmgd49e2Pmi2kiB6n0NAv"
                            onloadCallback={this.onLoadRecaptcha}
                            verifyCallback={this.verifyCallback}
                            ref={el => {
                              this.captchaDemo = el;
                            }}
                            render="explicit"
                            theme="white"
                          />
                        </div>
                        <div className="form-group col-12">
                          <button
                            className="btn btn-warning  btn-block"
                            disabled={this.state.disabledButton}
                          >
                            <i /> {this.lang.register}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CSignUp;
