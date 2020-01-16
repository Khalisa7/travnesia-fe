import React, { Component } from 'react'
import CUserNav from '../../MobileComponent/User/cUserNav'
import CUserHeader from '../../MobileComponent/User/cUserHeader'
import CUserProfileSection from '../../MobileComponent/User/cUserProfileSection'
import CUserHistory from '../../MobileComponent/User/cUserHistory'

import CSide from '../../Components/User/cSide';
import CHistory from '../../Components/User/cHistory';
import {isMobile, isBrowser} from "react-device-detect";
import MNavbar from '../../MobileComponent/Public/mNavbar'

class PUserHistory extends Component {
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
                    <MNavbar/>
                    <CUserHeader />
                    
                    <div className="container" style={{marginTop:-125+"px"}}>
                        <div className="row">
                            <div className="col-md-4 sticky">
                                <CUserNav />
                            </div>
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-md-12">
                                        <CUserProfileSection />
                                        <CUserHistory/>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
            );
        }
        else{
            return (
                <div className="pt-3">
                    <div className="container mt-5">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-3 pr-0">
                                        <CSide active={"My History"} />
                                    </div>
                                    <div className="col-md-9 border-left">
                                        <CHistory/>
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

export default PUserHistory;