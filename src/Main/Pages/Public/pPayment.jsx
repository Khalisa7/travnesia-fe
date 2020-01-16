import React, { Component } from "react";
import CPayment from "../../Components/Public/cPayment";
import CFooter from "../../Components/Public/cFooter";
import { isMobile, isBrowser } from "react-device-detect";
import MPayment from "../../MobileComponent/Public/mPayment";
import MHeader from '../../MobileComponent/Public/mHeaderPrevious'

class PPayment extends Component {
  constructor(props) {
    super(props);
    let params = new URLSearchParams(this.props.location.search);
    //BUG : can not get double query parameter
  }

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
    } else if (isMobile) {
      return (
        <div>
          <MHeader page="Detail Order"/>
          <MPayment />
        </div>
      );
    }
  }
}

export default PPayment;
