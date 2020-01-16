import React,{Component} from 'react'
import CUserNav from '../../MobileComponent/User/cUserNav'
import CUserHeader from '../../MobileComponent/User/cUserHeader'
import CUserProfileSection from '../../MobileComponent/User/cUserProfileSection'
import CUserTicketOpen from '../../MobileComponent/User/cUserTicketOpen'
import NNavbar from '../../MobileComponent/Public/mNavbar'
import MNavbar from '../../MobileComponent/Public/mNavbar';
import { isMobile, isBrowser } from "react-device-detect";

class PUserTicketOpen extends Component{
    constructor(props){
        super(props);
    }

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
    
    render(){
        if (isMobile){
        return(
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
                                    <CUserTicketOpen />
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>

            </div>
        );
        }
        else if (isBrowser){
            return(
                <div>
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
                                        <CUserTicketOpen />
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

export default PUserTicketOpen