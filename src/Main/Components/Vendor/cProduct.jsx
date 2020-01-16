import React, { Component } from 'react';
import './style/sProduct.css'
import Gambar from '../Public/img/affection-alley-architecture-307791.jpg'
import CDataTableActivePackage from './cDataTableActivePackage'
import CDataTablenonActivePackage from './cDataTablenonActivePackage'
import CDataTableOnPromotePackage from './cDataTableOnPromotePackage'
import VendorDetail from '../../../_services/vendor/VendorDetail'

class CProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            active : [],
            non_active : [],
            on_promote : []
        }

        this.Products = new VendorDetail()
    }

    componentDidMount(){
        this.Products.getProducts().then(res => {
            let active = []
            let non_active = []
            let on_promote = []
            res.result.map((data) => {
                if(data.status == 0){
                    non_active.push(data)
                }else if(data.status == 1){
                    active.push(data)
                }else if(data.status == 2){
                    on_promote.push(data)
                }
            }) 
            this.setState({active : active})
            this.setState({non_active : non_active})
            this.setState({on_promote : on_promote})
        })
          
         
    }


    render() {
        // console.log(this.state.active)
        // console.log(this.state.non_active)
        // console.log(this.state.on_promote)
        return (
            // <h1>uwu</h1>
            <div className="vendorProduct">
                <div className="row">
                    <div className="col-12 px-2">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link bg-transparent active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Active Packages</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link bg-transparent" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Non-active Packages</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link bg-transparent" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Promoted Packages</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <CDataTableActivePackage data={this.state.active} searchKey={"name"}/>
                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <CDataTablenonActivePackage data={this.state.non_active} searchKey={""} />
                            </div>
                            <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                <CDataTableOnPromotePackage data={this.state.on_promote} searchKey={""} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CProduct;
