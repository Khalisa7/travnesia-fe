import React, { Component, Fragment } from "react";
import CUserConfirmMessage from "../../Components/User/cUserConfirmMessage";
import CSubscribe from "../../Components/Public/cSubscribe";
import CFooter from "../../Components/Public/cFooter";
import { isMobile, isBrowser } from "react-device-detect";
import MFooter from "../../MobileComponent/Public/mFooter";
import MNavbar from '../../MobileComponent/Public/mNavbar'

export default class PUserConfirm extends Component {
  render() {
    const query = new URLSearchParams(this.props.location.search);
    const [resource, hash] = [query.get("resource"), query.get("hash")];
    if (isBrowser) {
      return (
        // console.log(query.get('resource') + query.get('hash'))
        <Fragment>
          <CUserConfirmMessage params={{ resource, hash }} />
          <CSubscribe />
          <CFooter />
        </Fragment>
      );
    }
    if (isMobile) {
      return (
        <Fragment>
          <MNavbar/>
          <CUserConfirmMessage params={{ resource, hash }} />
          <CSubscribe />
          <MFooter />
        </Fragment>
      );
    }
  }
}
