import React, { Component } from "react";
import CCheckout from "../../Components/Public/cCheckout";
import CSubscribe from "../../Components/Public/cSubscribe";
import CFooter from "../../Components/Public/cFooter";
import MFooter from "../../MobileComponent/Public/mFooter";
import { isMobile, isBrowser } from "react-device-detect";
import SMobileCheckout from "../../MobileComponent/Public/mCheckout";
import MHeader from '../../MobileComponent/Public/mHeaderPrevious'

class PCheckout extends Component {
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
          <CCheckout />
          <CSubscribe />
          <CFooter />
        </div>
      );
    } else if (isMobile) {
      return (
        <div>
            <MHeader page="Checkout"/>
            <SMobileCheckout />
            <MFooter />
        </div>
      );
    }
  }
}

export default PCheckout;
