import React, { Component } from "react";
import CPayment from "../../Components/User/cUserPayment";
import CFooter from "../../Components/Public/cFooter";
import { isMobile, isBrowser } from "react-device-detect";
import MFooter from "../../MobileComponent/Public/mFooter";
import MNavbar from '../../MobileComponent/Public/mNavbar';

class PUserPayment extends Component {
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
          <CPayment />
          <CFooter />
        </div>
      );
    }
    if (isMobile) {
      return (
        <div>
          <MNavbar/>
          <CPayment />
          <MFooter />
        </div>
      );
    }
  }
}

export default PUserPayment;
