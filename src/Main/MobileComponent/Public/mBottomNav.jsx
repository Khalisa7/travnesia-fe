import React, { Component } from "react";
import { Link } from "react-router-dom";
import Translations from "../../../localization/translations.js";
import LocalizedStrings from "react-localization";
import AccessControl from "./../../../_config/middleware/AccessControl";

class MBottomNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    //Get Translations
    this.Translations = new Translations();
    var translate = this.Translations.locale();
    this.lang = new LocalizedStrings({ translate });

    this.AccessControl = new AccessControl();
  }
  detecActiveLink() {
    switch (this.props.active) {
      case 'Home': return 1; break;
      case 'Booking': return 2; break;
      case 'Paket_Tour': return 3; break;
      case 'Profile': return 4; break;
    }
  }

  render() {
    const active = this.detecActiveLink();
    return (
      <footer className="fixed-bottom bottom-menu bottom-top">
        <div className="row ">
          <div className="col-xs-3 text-center" onClick={() => { console.log(active) }}>
            <Link to="/">
              <i className={(active == 1) ? "fa fa-lg fa-home f-primary-color" : "fa fa-lg fa-home f-primary-color"} />
              <div className="bottom-menu-title">{this.lang.home}</div>
            </Link>
          </div>
          <div className="col-xs-3 text-center" onClick={() => { console.log(active) }}>
            <Link to="/travel">
              <i className={(active == 2) ? "fa fa-lg fa-plane f-primary-color" : "fa fa-lg fa-plane f-primary-color"} />
              <div className="bottom-menu-title">{this.lang.travel}</div>
            </Link>
          </div>
          {this.AccessControl.loggedIn() ? (
            <div className="col-xs-3 text-center" onClick={() => { console.log(active) }}>
              <Link to="/user/booking">
                <i className={(active == 3) ? "fa fa-lg fa-book f-primary-color" : "fa fa-lg fa-book f-primary-color"} />
                <div className="bottom-menu-title">{this.lang.booking}</div>
              </Link>
            </div>
          ) : (
              <div className="col-xs-3 text-center" onClick={() => { console.log(active) }}>
                <Link to="/signin">
                  <i className={(active == 3) ? "fa fa-lg fa-book f-primary-color" : "fa fa-lg fa-book f-primary-color"} />
                  <div className="bottom-menu-title">{this.lang.booking}</div>
                </Link>
              </div>
            )}
          {this.AccessControl.loggedIn() ? (
            <div className="col-xs-3 text-center" onClick={() => { console.log(active) }}>
              <Link to="/user/dash">
                <i className={(active == 3) ? "fa fa-lg fa-user f-primary-color" : "fa fa-lg fa-user f-primary-color"} />
                <div className="bottom-menu-title">{this.lang.profil}</div>
              </Link>
            </div>
          ) : (
              <div className="col-xs-3 text-center" onClick={() => { console.log(active) }}>
                <Link to="/signin">
                  <i className={(active == 3) ? "fa fa-lg fa-user f-primary-color" : "fa fa-lg fa-user f-primary-color"} />
                  <div className="bottom-menu-title">{this.lang.profil}</div>
                </Link>
              </div>
            )}
        </div>
      </footer>
    );
  }
}

export default MBottomNav;
