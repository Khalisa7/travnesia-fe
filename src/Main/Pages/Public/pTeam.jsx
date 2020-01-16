import React, { Component } from 'react'
import CTeamPage from '../../Components/Public/cTeamPage'
import CFooter from '../../Components/Public/cFooter'
import {isMobile, isBrowser} from "react-device-detect";
import MFooter from "../../MobileComponent/Public/mFooter";
import MHeader from "../../MobileComponent/Public/mHeaderPrevious";

class PTeam extends Component {
    
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
        if(isBrowser)
        {
            return (
                <div>
                    <CTeamPage />
                    <CFooter />
                </div>
                )
        }
        if(isMobile)
        {
            return (
                <div>
                    <MHeader page="Team"/>
                    <CTeamPage />
                    <MFooter />
                </div>
                )
        }
    }
}

export default PTeam
