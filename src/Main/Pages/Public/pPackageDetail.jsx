import React, { Component } from "react";
import { isMobile, isBrowser } from "react-device-detect";
import CProductHeader from "../../Components/Public/cProductHeader";
import CDetailPackage from "../../Components/Public/cDetailPackage";
import CSubscribe from "../../Components/Public/cSubscribe";
import CFooter from "../../Components/Public/cFooter";
import CScrollButton from "../../Components/Public/cScrollButton";
import ProductService from "./../../../_services/product/ProductDetail";
import MFooter from "../../MobileComponent/Public/mFooter";
import MDetailPackage from "../../MobileComponent/Public/mDetailPackage";
import MHeader from '../../MobileComponent/Public/mHeaderPrevious'
import MTopPackage from '../../MobileComponent/Public/mTopPackage'

class PPackageDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: null,
      data: []
    };

    this.ProductService = new ProductService();
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

  getSlug() {
    var slug = this.props.match.params.data_slug;
    return slug;
  }

  render() {
    if (isBrowser) {
      return (
        <div>
          <CProductHeader />
          <CDetailPackage data={this.getSlug()} />
          <CSubscribe />
          <CFooter />
          <CScrollButton scrollStepInPx="50" delayInMs="16.66" />
        </div>
      );
    } else if (isMobile) {
      return (
        <div>
          <MHeader page="Detail Package"/>
          <MDetailPackage data={this.getSlug()}  />
          <div style={{marginBottom:70+'px'}}>
          <MTopPackage/>
          </div>
        </div>
      );
    }
  }
}

export default PPackageDetail;
