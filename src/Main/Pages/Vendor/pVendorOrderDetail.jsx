import React, { Component } from "react";
import CSide from '../../Components/Vendor/cSide';
import VendorDetail from '../../../_services/vendor/VendorDetail'
import CPayment from "../../Components/Vendor/cPayment";

class PVendorOrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data : []
    }

    this.Vendor = new VendorDetail()
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
    return (
        <div className="pt-3">
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-3 pr-0">
                                <CSide data={this.state.data.company_name} active={"Dashboard"} />
                            </div>
                            <div className="col-md-9 border-left">
                                <CPayment />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default PVendorOrderDetail;
