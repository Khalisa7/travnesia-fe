import React, { Component } from 'react'

import CSubHeader from '../../Components/Public/cSubHeader'
import CTravelList from '../../Components/Public/cTravelList'
import CSubscribe from '../../Components/Public/cSubscribe'
import CFooter from '../../Components/Public/cFooter'
import CScrollButton from '../../Components/Public/cScrollButton'
import { isMobile, isBrowser } from "react-device-detect";
import MTravelList from '../../MobileComponent/Public/mTravelList'
import MBottomTravelNav from '../../MobileComponent/Public/mBottomTravelNav'
import Popular from '../../Components/Public/cPopular'
import MHeader from '../../MobileComponent/Public/mHeaderPrevious'
import CityPop from '../../../_services/product/popularCity'


class PTravel extends Component {

	constructor (props){
		super(props)
		this.state = {
			data : []
		}
		//backend service
		this.CityPop = new CityPop()
	}

    componentDidMount () {
		// console.log(this.props)
		this.CityPop.getCityPop()
            .then(res => {
                let data_map = res.result.map(data => {
                    return data
                })
                this.setState({ data: data_map })
            })
			.catch(error => console.log(error))
			
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
		if (isMobile) {
			return (
				<div>
					<MHeader page="Travel" url={process.env.PUBLIC_URL}/>
					<div style={{ marginBottom: 40 + "px" }}>
						<MTravelList />
					</div>
					{/* <MBottomTravelNav /> */}
				</div>
			)
		}
		else {
			return (
				<div>
					<CSubHeader />
					<Popular data={this.state.data}/>
					<CTravelList />
					<CSubscribe />
					<CFooter />
					<CScrollButton scrollStepInPx='50' delayInMs='16.66' />
				</div>
			)
		}
	}
}

export default PTravel
