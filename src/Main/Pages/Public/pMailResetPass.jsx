import React, { Component } from 'react'
import CMailResetPass from '../../Components/Public/cMailResetPass'
import CFooter from '../../Components/Public/cFooter'

import AccessControl from '../../../_config/middleware/AccessControl'
import { isMobile, isBrowser } from "react-device-detect";
import MHeader from '../../MobileComponent/Public/mHeaderPrevious'


class PMailResetPass extends Component {
    componentDidMount () {
        this.AccessControl = new AccessControl()
        if(this.AccessControl.loggedIn()){
            window.location = '/'
        }
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
                    <MHeader page="Reset Password"/>
                    <CMailResetPass />
                </div>
            ); 
        } else if(isBrowser){
            return(
                <div>
                    <CMailResetPass />
                </div>
            )
        }

    }
}

export default PMailResetPass
