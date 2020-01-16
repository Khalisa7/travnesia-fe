import React, { Component } from "react"
import "./style/sSignIn.css"
import Recaptcha from "react-recaptcha"
import AuthService from "../../../_services/vendor/AuthService"
import Alert from "../../../_services/alert/Alert"
import Translations from "../../../localization/translations.js"
import LocalizedStrings from "react-localization"
import AccessControl from "./../../../_config/middleware/AccessControl"
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
  ;

class CSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false,
      redirect: false,
      username: "",
      password: "",
      gcaptcha: false,
      disabledButton: false,
      loaderButton: false,
      _csrf: "",
      loader: true
    };

    this.Auth = new AuthService();
    this.Alert = new Alert();
    this.AccessControl = new AccessControl();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);

    //Translations
    this.Translations = new Translations();
    var Locale = this.Translations.locale();
    this.lang = new LocalizedStrings({ Locale });
  }

  componentDidMount() {
    if (this.AccessControl.loggedIn() == true) {
      window.location = "/";
    }

    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }

    $("input").focus(function () {
      $(this)
        .parent(".input-group")
        .css("box-shadow", "0px 0px 0px 2px rgba(120, 179, 255, 0.767)");
    });
    $("input").focusout(function () {
      $(this)
        .parent(".input-group")
        .css("box-shadow", "none");
    });

    setTimeout(() => this.setState({ loader: false }), 900)
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.gcaptcha) {

      this.setState({
        disabledButton: true,
        loaderButton: "fa fa-spinner fa-spin"
      });

      this.Auth.login(this.state.username, this.state.password)
        .then(res => {
          window.location = "/partner";
        })
        .catch(err => {
          this.setState({ disabledButton: false, loaderButton: false });
          this.captchaDemo.reset();
          this.Alert.error(this.lang.failed, this.lang.signin_failed_message);
        });
    } else {
      this.setState({ disabledButton: false, loaderButton: false });
      this.Alert.error("Gagal", "Anda harus memverifikasi reCaptcha");
    }
  }

  onLoadRecaptcha() {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }

  verifyCallback(recaptchaToken) {
    if (recaptchaToken) {
      this.setState({ gcaptcha: true });
    }
  }

  render() {
    return (
      <div>
        <Loading
          show={this.state.loader}
          color="red"
        />
        <div className="signIn">
          <div className="container text-center">
            <div className="row pt-5 pb-5">
              <div className={this.state.mobile ? "d-none" : "col-md-8"}>
                <div className="card border-0 rounded-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 col-6">
                        <img
                          src={
                            process.env.REACT_APP_CDN_RESOURCE +
                            "signin_section_1.png"
                          }
                          alt="Feature Section 1"
                        />
                        <h6 className="font-weight-bold img-signin">
                          {this.lang.signin_featured_1}
                        </h6>
                        <p className="textOnly">
                          {this.lang.signin_featured_1_desc}
                        </p>
                      </div>
                      <div className="col-md-6 col-6">
                        <img
                          src={
                            process.env.REACT_APP_CDN_RESOURCE +
                            "signin_section_2.png"
                          }
                          alt="Feature Section 2"
                        />
                        <h6 className="font-weight-bold img-signin">
                          {this.lang.signin_featured_2}
                        </h6>
                        <p>{this.lang.signin_featured_2_desc}</p>
                      </div>
                      <div className="col-md-6 col-6">
                        <img
                          src={
                            process.env.REACT_APP_CDN_RESOURCE +
                            "signin_section_3.png"
                          }
                          alt="Feature Section 3"
                        />
                        <h6 className="font-weight-bold img-signin">
                          {this.lang.signin_featured_3}
                        </h6>
                        <p>{this.lang.signin_featured_3_desc}</p>
                      </div>
                      <div className="col-md-6 col-6">
                        <img
                          src={
                            process.env.REACT_APP_CDN_RESOURCE +
                            "signin_section_4.png"
                          }
                          alt="Feature Section 4"
                        />
                        <h6 className="font-weight-bold img-signin">
                          {this.lang.signin_featured_4}
                        </h6>
                        <p className="textOnly">
                          {this.lang.signin_featured_4_desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow bg-white border-0">
                  <div className="card-body">
                    <img
                      style={{ width: 200 + "px", marginBottom: 30 + "px" }}
                      src={process.env.REACT_APP_LOGO}
                      alt="Tripdize Logo"
                    />
                    {/* <button
                    className="btn btn-primary btn-block"
                    onClick={this.facebookLoginhandler}
                  >
                    <i className="fa fa-facebook-official" />{" "}
                    {this.lang.login_form_facebook}
                  </button>
                  <h6 className="text-center mt-3 mb-3">{this.lang.or}</h6> */}
                    <form onSubmit={this.handleSubmit}>
                      <input
                        type="hidden"
                        className="csrf-token"
                        value={this.state._csrf}
                      />
                      <div className="form-row text-left">
                        <div className="form-group col-12">
                          <input
                            type="email"
                            className="form-control"
                            placeholder={this.lang.email}
                            onChange={ev =>
                              this.setState({ username: ev.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="form-row text-left">
                        <div className="form-group col-12">
                          <input
                            type="password"
                            className="form-control"
                            placeholder={this.lang.password}
                            onChange={ev =>
                              this.setState({ password: ev.target.value })
                            }
                            required
                          />
                          <div className="forgot-password">
                            <a href={process.env.REACT_APP_URL + "partner/forgot_pass"}>
                              Forgot Password?
                          </a>
                          </div>
                        </div>
                      </div>
                      <div className="form-row text-left">
                        <div className="form-group col-12">
                          <div className="captcha">
                            {/* <Recaptcha
                              sitekey="6LcYjX4UAAAAAER1GnHgmgd49e2Pmi2kiB6n0NAv"
                              onloadCallback={this.onLoadRecaptcha}
                              verifyCallback={this.verifyCallback}
                              ref={el => {
                                this.captchaDemo = el;
                              }}
                              render="explicit"
                              theme="white"
                            /> */}
                          </div>
                        </div>
                        <div className="form-group col-12">
                          <button
                            className="btn btn-danger primary-color wi  dthSignIn btn-block"
                            disabled={this.state.disabledButton}
                          >
                            <i
                              className={
                                this.state.loaderButton
                                  ? "fa fa-spinner fa-spin"
                                  : ""
                              }
                            />{" "}
                            {this.lang.login}
                          </button>
                        </div>
                      </div>
                    </form>
                    <hr />
                    <p>
                      {this.lang.signup_account}
                      <a
                        href={process.env.REACT_APP_VENDOR + "signup"}
                        className="f-primary-color"
                      >
                        {" "}
                        {this.lang.signup_link}
                      </a>
                    </p>

                    <br />
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

export default CSignIn;
