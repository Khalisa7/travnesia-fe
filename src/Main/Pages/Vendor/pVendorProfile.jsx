import React, { Component } from 'react'
import CSide from '../../Components/Vendor/cSide';
import CProfile from '../../Components/Vendor/cProfile';
import VendorDetail from '../../../_services/vendor/VendorDetail'

class PVendorProfile extends Component {
	constructor(props) {
		super(props);
		this.state = { data: [] }
		this.Detail = new VendorDetail()

	}

	componentDidMount() {
		this.Detail.getProfile().then(res => {
			this.setState({data : res.result})
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
		// console.log(this.state.data)
		return (
			<div className="pt-3">
				<div className="container mt-5">
					<div className="row justify-content-center">
						<div className="col-md-12">
							<div className="row">
								<div className="col-md-3 pr-0">
									<CSide active={"My Profile"} />
								</div>
								<div className="col-md-9 border-left">
									<CProfile data={this.state.data}></CProfile>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);

	}
}

export default PVendorProfile;