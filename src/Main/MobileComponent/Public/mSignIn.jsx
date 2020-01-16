import React, { Component } from "react";
import Recaptcha from "react-recaptcha";
import AuthService from "../../../_services/customers/AuthService";
import Alert from "../../../_services/alert/Alert";
import Translations from "../../../localization/translations.js";
import LocalizedStrings from "react-localization";
import AccessControl from "./../../../_config/middleware/AccessControl";


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
      _csrf: ""
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
  }

  componentWillUnmount() {
    this.AccessControl.loggedIn();
  }

  handleSubmit(event) {
    event.preventDefault();
    // if (this.state.gcaptcha) {
    //   this.setState({
    //     disabledButton: true,
    //     loaderButton: "fa fa-spinner fa-spin"
    //   });
      this.Auth.login(this.state.username, this.state.password)
        .then(res => {
          window.location = "/";
        })
        .catch(err => {
          this.setState({ disabledButton: false, loaderButton: false });
        //   this.captchaDemo.reset();
          this.Alert.error(this.lang.failed, this.lang.signin_failed_message);
        });
    // } else {
    //   this.setState({ disabledButton: false, loaderButton: false });
    //   this.Alert.error("Gagal", "Anda harus memverifikasi reCaptcha");
    // }
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
        <div className="container text-center">
          <div className="row pt-4 pb-4">
            <div className="col-12">
              {/* <button
                className="btn btn-primary btn-block"
                onClick={this.facebookLoginhandler}
              >
                <i className="fa fa-facebook-official" />{" "}
                {this.lang.login_form_facebook}
              </button>
              <h6 className="text-center mt-3 mb-3">{this.lang.or}</h6> */}
              <img
                style={{ width: 200 + "px" }}
                src={process.env.REACT_APP_LOGO}
                alt="Tripdize Logo"
              />
              <form style={{ marginTop: 50 }} onSubmit={this.handleSubmit}>
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
                    />
                    <div className="forgot-password">
                      <a href="#">Forgot Password?</a>
                    </div>
                  </div>
                </div>
                <div className="form-row text-center">
                  <div className="captcha">
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
                      className="btn btn-danger primary-color wi  dthSignIn btn-block"
                      disabled={this.state.disabledButton}
                    >
                      <i
                        className={
                          this.state.loaderButton ? "fa fa-spinner fa-spin" : ""
                        }
                      />{" "}
                      {this.lang.login}
                    </button>
                  </div>
                </div>
              </form>
              <p>
                {this.lang.signup_account}
                <a
                  href={process.env.PUBLIC_URL + "signup"}
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
    );
  }
}

export default CSignIn;
