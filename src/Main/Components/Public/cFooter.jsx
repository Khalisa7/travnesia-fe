import React, { Component } from "react";
import "./style/sFooter.css";
import store from "./img/store.png";
import AppStoreImage from "./img/app-store.svg";
import PlayStoreImage from "./img/play-store.svg";
import Phone24Hours from "./img/24hours.svg";
import Translations from "../../../localization/translations.js";
import LocalizedStrings from "react-localization";
import logo_asita from "./img/logo_asita.png";

class CFooter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="dekstop-footer">
        <div className="container footer-dekstop-view">
          <div className="row">
            <div className="col-md-3">
              <h3>Member of</h3>
              <div className="media ">
                <img
                  className="align-self-center mr-3" style={{height:65+"px", width:87+"px"}}
                  src={logo_asita}
                  alt=""
                />
                <div className="media-body">
                  <br />
                  ASITA
                  <p>Association of Indonesian Tours and Travel Agencies</p>
                </div>
              </div>
              <br />
              <h6>Payment Partners</h6>
              <div className="bank_logo logo_bri" />
              <div className="bank_logo logo_bca" />
              <div className="bank_logo logo_mandiri" />
              <div className="bank_logo logo_cimb" />
              <div className="bank_logo logo_alfamart" />
              <div className="bank_logo logo_bni" />
              <div className="bank_logo logo_link" />
              <div className="bank_logo logo_visa" />
              <div className="bank_logo logo_prima" />
            </div>
            <div className="col-md-3">
              <h6>Tripdize.com</h6>
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="">About Company</a>
                </li>
                <li className="list-group-item">
                  <a href="">Our Team</a>
                </li>
                <li className="list-group-item">
                  <a href={process.env.PUBLIC_URL + "terms-of-service"}>
                    Term Of Service
                  </a>
                </li>
                <li className="list-group-item">
                  <a href={process.env.PUBLIC_URL + "faq"}>FAQ</a>
                </li>
              </ul>
              <br />
            </div>
            <div className="col-md-3">
              <h6>Contact Us</h6>
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="">
                    <i
                      className="fa fa-envelope-o fa-fw mr-3"
                      aria-hidden="true"
                    />
                    info@tripdize.com
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="">
                    <i className="fa fa-phone fa-fw mr-3" aria-hidden="true" />
                    081111222333
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="">
                    <i
                      className="fa fa-facebook fa-fw mr-3"
                      aria-hidden="true"
                    />
                    Facebook
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="">
                    <i
                      className="fa fa-instagram fa-fw mr-3"
                      aria-hidden="true"
                    />
                    Instagram
                  </a>
                </li>
              </ul>
              <br />
            </div>
            <div className="col-md-3">
              <h6>Office</h6>
              PT. Citra Laras Wisata
              <p>
                Jl. Tegal Melati, Jombor Lor, Sinduadi, Mlati, Kabupaten Sleman,
                Daerah Istimewa Yogyakarta 55285
              </p>
              <br />
              <div className="app_logo">
                <img src={store} style={{height:150+"px", width:200+"px"}} alt="" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default CFooter;
