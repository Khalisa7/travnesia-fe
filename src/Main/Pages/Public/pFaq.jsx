import React, { Component } from "react";
import CSubHeader from "../../Components/Public/cSubHeader";
import CFaq from "../../Components/Public/cFaq";
import CSubscribe from "../../Components/Public/cSubscribe";
import CFooter from "../../Components/Public/cFooter";
import { isMobile, isBrowser } from "react-device-detect";
import MFooter from "../../MobileComponent/Public/mFooter";
import MNavbar from '../../MobileComponent/Public/mNavbar'

class PFaq extends Component {
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
          <CSubHeader />
          <CFaq />
          <CSubscribe />
          <CFooter />
        </div>
      );
    }
    if (isMobile) {
      return (
        <div>
          <MNavbar/>
          <CSubHeader />
          <CFaq />
          <CSubscribe />
          <MFooter />
        </div>
      );
    }
  }
}

export default PFaq;
