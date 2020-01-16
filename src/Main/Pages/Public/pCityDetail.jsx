import React, { Component } from "react";

import Jumbotron from "../../Components/Public/cJumbotronCity";
import Activities from "../../Components/Public/cActivitiesCity";
import Detail from "../../Components/Public/cDetailCity";
import NearDestination from "../../Components/Public/cNearDestination";

import CSubscribe from "../../Components/Public/cSubscribe";
import CFooter from "../../Components/Public/cFooter";

import MHeader from '../../MobileComponent/Public/mHeaderPrevious'
import MFooter from "../../MobileComponent/Public/mFooter";
import { isMobile, isBrowser } from "react-device-detect";

export default class DetailCity extends Component {
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
    if (isMobile){
      return(
        <div>
            <Jumbotron />
            <Activities />
            <Detail />
            <NearDestination />
            <MFooter/>
            <MHeader page='City'/>
        </div>
      )
    }
    else if(isBrowser)
    {
      return(
        <div>
            <Jumbotron />
            <Activities />
            <Detail />
            <NearDestination />
        </div>
      )
    }
  }
}
