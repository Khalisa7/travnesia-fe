import React, { Component } from 'react'
import {isMobile, isBrowser} from "react-device-detect";

import CBook from "../../Components/User/cBook";
import CSide from "../../Components/User/cSide";

import CUserBook from '../../MobileComponent/User/cUserBook'
import CUserHeader from "../../MobileComponent/User/cUserHeader";
import CUserNav from "../../MobileComponent/User/cUserNav";
import CUserProfileSection from "../../MobileComponent/User/cUserProfileSection";
import MBottomNav from "../../MobileComponent/Public/mBottomNav";
import MNavbar from '../../MobileComponent/Public/mHeaderPrevious'

class PUserCart extends Component {

    
    componentDidMount () {
        this.authenticate().then(() => {
        const ele = document.getElementById('ipl-progress-indicator')
        if (ele) {
            ele.classList.add('available')
            setTimeout(() => {
            ele.outerHTML = ''
            }, 1000)
        }
        })
    }

    authenticate () {
        return new Promise(resolve => setTimeout(resolve, 2000))
    }
    
    render () {
        if(isMobile){
            return (
                <div>
                    <MNavbar page="Booking"/>
                    <div className="container" >
                        <div className="row">
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-12">
                                        <CUserBook/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className="pt-3">
                    <div className="container mt-5">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-3 pr-0">
                                        <CSide active={"My Booking"} />
                                    </div>
                                    <div className="col-md-9 border-left">
                                        <CBook></CBook>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default PUserCart
