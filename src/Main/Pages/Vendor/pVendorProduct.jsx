import React, { Component } from 'react';
import CProduct from '../../Components/Vendor/cProduct'
import CSide from '../../Components/Vendor/cSide';
import { isMobile, isBrowser } from "react-device-detect";
import MNavbar from '../../MobileComponent/Public/mNavbar'
import MBottom from '../../MobileComponent/Public/mBottomNav'

class PVendorProduct extends Component {
    render() {
        if (isBrowser){
            return (
                <div className="pt-3">
                    <div className="container mt-5">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-3 pr-0">
                                        <CSide active={"My Product"} />
                                    </div>
                                    <div className="col-md-9 border-left">
                                        <CProduct/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (isMobile){
            return(
                <div className="">
                <MNavbar/>
                    <div className="container mt-5">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-3">
                                        <CSide active={"My Product"} />
                                    </div>
                                    <div className="col-md-9 mb-5" >
                                        <CProduct/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <MBottom/>
                </div>  
            );
        }
    }
}

export default PVendorProduct;