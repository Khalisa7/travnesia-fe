import React, { Component } from "react";
import CSignIn from "../../Components/Vendor/cSignIn";
import CSubscribe from "../../Components/Public/cSubscribe";
import CFooter from "../../Components/Public/cFooter";
import MFooter from "../../MobileComponent/Public/mFooter";
import { isMobile, isBrowser } from "react-device-detect";
import MSignIn from "../../MobileComponent/Vendor/mSignIn";
import MBottomNav from "../../MobileComponent/Public/mBottomNav";
import MHeader from '../../MobileComponent/Public/mHeaderPrevious'

class PVendorSignIn extends Component {
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
    if (isMobile) {
      return (
        <div>
          <MHeader page="Sign In" />
          <MSignIn />
          <MFooter />
          <MBottomNav />
        </div>
      );
    } else {
      return (
        <div>
          <CSignIn />
          <CSubscribe />
          <CFooter />
        </div>
      );
    }
  }
}

export default PVendorSignIn;
