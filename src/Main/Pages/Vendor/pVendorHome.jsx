import React, { Component } from 'react'
import CSide from '../../Components/Vendor/cSide';
import CHome from '../../Components/Vendor/cHome';
import VendorDetail from '../../../_services/vendor/VendorDetail'

class PVendorHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data : []
		}

		this.Vendor = new VendorDetail()
	}


	componentDidMount() {
		this.Vendor.getProfile().then(res => {
			this.setState({data : res.result})
		}).catch(err => {
			return false 
		})
			
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
									<CHome></CHome>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default PVendorHome;