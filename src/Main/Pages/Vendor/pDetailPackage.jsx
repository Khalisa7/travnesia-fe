import React, { Component } from 'react';
import CSide from '../../Components/Vendor/cSide';
import CDetailProduct from '../../Components/Vendor/cDetailPackage'
import { isMobile, isBrowser } from "react-device-detect";
import MNavbar from '../../MobileComponent/Public/mNavbar'
import MBottom from '../../MobileComponent/Public/mBottomNav'
import detailService from '../../../_services/vendor/productDetail'

class PDetailPackage extends Component {
    constructor(props){
        super(props)
        this.state ={
            slug : null,
            data : []
        }

        this.detailService = new detailService()
        this.getSlug = this.getSlug.bind(this)
    }

    getSlug() {
        var slug = this.props.match.params.data_slug;
        return slug;
      }

    // componentDidMount() {
    //     let slug = this.state.data
    //     this.detailService.getProduct(slug)
    //         .then(res => {
    //             let data_map = res.result.map((data) => {
    //                 return data
    //             })
    //             this.setState({ data: data_map })
    //         })
    //         .catch(err => {
    //             return false
    //         })
    // }

    render() {
        if (isBrowser){
            return (
                <div className="pt-3">
                    <div className="container mt-5">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-3 pr-0">
                                        <CSide active={"My Product"} />
                                    </div>
                                    <div className="col-md-9 border-left">
                                        <CDetailProduct data={this.getSlug()}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (isMobile){
            return(
                <div className="">
                <MNavbar/>
                    <div className="container mt-5">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-3">
                                        <CSide active={"My Product"} />
                                    </div>
                                    <div className="col-md-9 mb-5" >
                                        <CDetailProduct data={this.getSlug()} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <MBottom/>
                </div>  
            );
        }
    }
}

export default PDetailPackage;