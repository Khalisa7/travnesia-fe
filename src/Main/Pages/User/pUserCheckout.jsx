import React, { Component } from "react";
import CUserCheckout from "../../MobileComponent/User/cUserCheckout";
import CSubscribe from "../../MobileComponent/Public/cSubscribe";
import CFooter from "../../MobileComponent/Public/cFooter";
import { isMobile, isBrowser } from "react-device-detect";
import MFooter from "../../MobileComponent/Public/mFooter";
import MNavbar from '../../MobileComponent/Public/mNavbar'

class PUserCheckout extends Component {
  componentDidMount() {
    this.authenticate().then(() => {
      const ele = document.getElementById("ipl-progress-indicator");
      if (ele) {
        ele.classList.add("available");
        setTimeout(() => {
          ele.outerHTML = "";
        }, 1000);
      }
    });
  }

  authenticate() {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }

  render() {
    if (isBrowser) {
      return (
        <div>
          <CUserCheckout />
          <CSubscribe />
          <CFooter />
        </div>
      );
    }
    if (isMobile) {
      return (
        <div>
          <MNavbar/>
          <CUserCheckout />
          <CSubscribe />
          <MFooter />
        </div>
      );
    }
  }
}

export default PUserCheckout;
