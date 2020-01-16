import React, { Component } from 'react'
import CResetPassword from '../../Components/Vendor/cResetPassword'
import CFooter from '../../Components/Public/cFooter'
import AccessControl from '../../../_config/middleware/AccessControl'
import { isMobile, isBrowser } from "react-device-detect";
import MNavbar from '../../MobileComponent/Public/mNavbar'

class PResetPassword extends Component {
    componentDidMount() {
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

    authenticate() {
        return new Promise(resolve => setTimeout(resolve, 2000))
    }

    render() {
        const query = new URLSearchParams(this.props.location.search)
        const [resource, locator, hash] = [query.get('resource'), query.get('locator'), query.get('hash')]
        if(isMobile){
        return (
            <div>
                <MNavbar/>
                <CResetPassword params={{ resource, locator, hash }} />
            </div>
        );
        }
        else if(isBrowser){
            return (
                <div>
                    <CResetPassword params={{ resource, locator, hash }} />
                </div>
            );  
        }
    }
}

export default PResetPassword
