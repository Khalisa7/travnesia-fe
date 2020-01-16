import React, { Component } from "react";
import { isMobile, isBrowser } from "react-device-detect";
import CHeader from "../../Components/Public/cHeader";
import CPopularDestination from "../../Components/Public/cPopularDestination";
import CTopPackage from "../../Components/Public/cTopPackage";
import CPlaystore from "../../Components/Public/cPlaystore";
import CPartnership from "../../Components/Public/cPartnership";
import CSubscribe from "../../Components/Public/cSubscribe";
import CFooter from "../../Components/Public/cFooter";
import CBlog from "../../Components/Public/cBlog";
import MHeader from "../../MobileComponent/Public/mHeader";
import MPopularDestination from "../../MobileComponent/Public/mPopularDestination";
import MTopPackage from "../../MobileComponent/Public/mTopPackage";
import MPartnership from "../../MobileComponent/Public/mPartnership";
import MFooter from "../../MobileComponent/Public/mFooter";
import MBottomNav from "../../MobileComponent/Public/mBottomNav";
import MNavbar from '../../MobileComponent/Public/mNavbar';


class PHome extends Component {
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
            <MNavbar/>
            <MHeader />
            <MPopularDestination />
            <MTopPackage />
            <MPartnership />
            <MFooter />
            <MBottomNav active={"Home"} />
        </div>
      );
    } else if (isBrowser) {
      return (
        <div>
          <CHeader />
          <CPopularDestination />
          <CPlaystore />
          <CTopPackage />
          <CBlog />
          <CPartnership />
          <CSubscribe />
          <CFooter />
        </div>
      );
    }
  }
}

export default PHome;
