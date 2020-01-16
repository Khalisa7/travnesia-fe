import React, { Component } from 'react'
import CSide from '../../Components/Vendor/cSide';
import CVendorTransaction from '../../Components/Vendor/cTransaction';

class PVendorTransaction extends Component {
    render(){
        return(
			<div className="pt-3">
				<div className="container mt-5">
					<div className="row justify-content-center">
						<div className="col-md-12">
							<div className="row">
								<div className="col-md-3 pr-0">
									<CSide active={"My Transaction"} />
								</div>
								<div className="col-md-9 border-left">
  									<CVendorTransaction ></CVendorTransaction>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
        );
    }
}
export default PVendorTransaction;
