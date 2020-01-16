import React, { Component } from 'react';
import './style/sDetailPackage.css';
import hotel from '../../Components/Public/img/hotel.png'
import flight from "../../Components/Public/img/plane.png";
import meals from "../../Components/Public/img/breakfast.png";
import bagage from "../../Components/Public/img/suitcase.png";
import transportation from '../../Components/Public/img/taxi.png';
import detailService from '../../../_services/vendor/productDetail';
import CIncome from '../Vendor/cIncome'


class CDetailPackage extends Component {
    constructor(props) {
        super(props)

        this.detailService = new detailService()

        this.getFacility = this.getFacility.bind(this)
        this.getGuarantee = this.getGuarantee.bind(this)

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        let slug = this.props.data
        this.detailService.getProduct(slug)
            .then(res => {
                let data_map = res.result.map((data) => {
                    return data
                })
                this.setState({ data: data_map })
            })
            .catch(err => {
                return false
            })
    }

    getFacility(data) {
        var array = []
        var facility = data.split(",")
        for (let i = 0; i < facility.length; i++) {
            if (facility[i].includes('hotel')) {
                array.push(
                    <div className='col text-center' key={i}>
                        <span>
                            <img id='image-include-pax' src={hotel} alt='include Hotel' />
                            <h6 id='facility-name'>Hotel</h6>
                        </span>
                    </div>
                )
            } else if (facility[i].includes('transportation')) {
                array.push(
                    <div className='col text-center' key={i}>
                        <span>
                            <img id='image-include-pax' src={transportation} alt='include Transportation' />
                            <h6 id='facility-name'>Transportation</h6>
                        </span>
                    </div>
                )
            } else if (facility[i].includes('flight-oneway')) {
                array.push(
                    <div className='col text-center' key={i}>
                        <span>
                            <img id='image-include-pax' src={flight} alt='include flight' />
                            <h6 id='facility-name'>Flight (Pergi)</h6>
                        </span>
                    </div>
                )
            } else if (facility[i].includes('flight-twoway')) {
                array.push(
                    <div className='col text-center' key={i}>
                        <span>
                            <img id='image-include-pax' src={flight} alt='Include Two Way Flight' />
                            <h6 id='facility-name'>Flight (Pulang-Pergi)</h6>
                        </span>
                    </div>
                )
            } else if (facility[i].includes('meals')) {
                array.push(
                    <div className='col text-center' key={i}>
                        <span>
                            <img id='image-include-pax' src={meals} alt='Include Meals' />
                            <h6 id='facility-name'>Meals</h6>
                        </span>
                    </div>)
            } else if (facility[i].includes('bagage')) {
                array.push(
                    <div className='col text-center' key={i}>
                        <span>
                            <img id='image-include-pax' src={bagage} alt='Include Bagage' />
                            <h6 id='facility-name'>Bagage</h6>
                        </span>
                    </div>)
            }
        }
        return array
    }

    getGuarantee(data) {
        var array = []
        var guarantee = data.split(",")
        for (let i = 0; i < guarantee.length; i++) {
            if (guarantee[i].includes('refund')) {
                array.push(
                    <li className='d-inline-block mr-4' key={i}>
                        <i className='fa fa-ticket d-inline-block text-black-50' style={{ fontSize: 1.2 + 'rem' }}></i>
                            <div className='d-inline-block ml-3'><p>Jaminan Uang Kembali</p></div>
                    </li>
                    )
            } else if (guarantee[i].includes('flexible')) {
                array.push(
                    <li className='d-inline-block mr-4' key={i}>
                        <i className='fa fa-ticket d-inline-block text-black-50' style={{ fontSize: 1.2 + 'rem' }}></i>
                            <div className='d-inline-block ml-3'><p>Cetak atau Tunjukan Mobile Voucher</p></div>
                    </li>
                )
            } else if (guarantee[i].includes('fastcheckin')) {
                array.push(
                    <li className='d-inline-block mr-4' key={i}>
                        <i className='fa fa-ticket d-inline-block text-black-50' style={{ fontSize: 1.2 + 'rem' }}></i>
                            <div className='d-inline-block ml-3'><p>Open Date Ticket</p></div>
                    </li>
                    )
            } else {
                array.push(
                    <li className='d-inline-block mr-4' key={i}>
                        <i className='fa fa-ticket d-inline-block text-black-50' style={{ fontSize: 1.2 + 'rem' }}></i>
                            <div className='d-inline-block ml-3'><p>Masuk Langsung dengan Voucher</p></div>
                    </li>
                )
            }
            return array
        }
    }

    monitor(){
        return(
                <div className='row'>
                    <div className='col-md-4 col-sm-6'>
                        <div className='card bg-white mb-3'>
                            <div className="card-header pb-0 bg-transparent border-0 bg-icon">
                                Order hari ini
                                <hr/>
                            </div>
                            <div className="card-body">
                                <h2 className='card-title'>Rp. 10.111.1111</h2>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 col-sm-6  px-2'>
                        <div className='card bg-white mb-3'>
                            <div className="card-header pb-0 bg-transparent border-0 bg-icon">
                            Income Today
                                <hr/>
                            </div>
                            <div className="card-body">
                                <h2 className='card-title'>Rp. 10.111.1111</h2>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 col-sm-6  px-2'>
                        <div className='card bg-white mb-3'>
                            <div className="card-header pb-0 bg-transparent border-0 bg-icon">
                            Total Withdrawal
                                <hr/>
                            </div>
                            <div className="card-body">
                                <h2 className='card-title'>Rp. 10.111.1111</h2>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }

    render() {
        return (
            
            <div className="vendor-navigasi mb-3 w-100">
                {this.monitor()}
                <div className="row">
                    <div className="col-12">
                        <ul className="nav nav-tabs" id='myTab' role='tablist'>
                            <li className="nav-item">
                                <a className='nav-link bg-transparent active' id='lohat-tab' data-toggle='tab' role='tab' aria-selected='true' aria-controls='home' href="#lihat">Lihat Detail</a>
                            </li>
                            <li className="nav-item">
                                <a className='nav-link bg-transparent' id='income-tab' data-toggle='tab' role='tab' aria-selected='fals' aria-controls='home' href="#income">Income Today</a>
                            </li>
                            <li className="nav-item">
                                <a className='nav-link bg-transparent' id='pending-tab' data-toggle='tab' role='tab' aria-selected='fals' aria-controls='home' href="#pending">Pending</a>
                            </li>
                            <li className="nav-item">
                                <a className='nav-link bg-transparent' id='success-tab' data-toggle='tab' role='tab' aria-selected='fals' aria-controls='home' href="#success">Succes</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='tab-content' id='myTabContent'>
                    <div className="tab-pane fade show active" id="lihat" role="tabpanel" aria-labelledby="home-tab">
                        {this.state.data.map((data_map, i) => {
                            return (
                                <div className='col-md-12 px-0' key={i}>
                                    <img id='image-datail-package' src={process.env.REACT_APP_CDN_PRODUCT + data_map.image} alt='Dummy image' width='100%' />
                                    
                                    <div className='page-heading mt-3'>
                                        <h5 className="mb-0">
                                            {data_map.name}
                                        </h5>
                                    </div>
                                    {this.getGuarantee(data_map.guarantee)}
                                    <br/>


                                    {/* Deskripsi */}
                                    <h5 className="mb-0">Deskripsi</h5>
                                    <div className="mb-3" dangerouslySetInnerHTML={{__html:data_map.id_desc}} />
                                    <br/>


                                    {/* Fasilitas */}
                                    <h5 className="mb-2">Sudah Termasuk</h5>
                                    <div className='collapse show'>
                                        <div className="row">
                                            {this.getFacility(data_map.facility)}
                                        </div>
                                    </div>
                                    <br/>

                                    {/* Itenerary */}
                                    <h5>Itenerary</h5>
                                    {data_map.itinerary.map((data,i) => {
                                        return (
                                            <div className='col-12 mt-2 px-0 float-left' key={i}>
                                                <div className='card shadow-sm'>
                                                    <div className='card-header' data-toggle='collapse'
                                                        data-target={'#collapseItenarary'+i}
                                                        aria-expanded='false'
                                                        aria-controls={'collapseItenarary'+i}>
                                                        <span>Day {i+1}</span>
                                                    </div>
                                                    <div className='collapse' id={'collapseItenarary'+i}>
                                                        <div className='col-12'>
                                                            <div dangerouslySetInnerHTML={{__html:data.description}} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                    <div className="tab-pane fade" id="income" role="tabpanel" aria-labelledby="income-tab">
                        <CIncome/>
                    </div>
                    <div className="tab-pane fade" id="pending" role="tabpanel" aria-labelledby="pending-tab">
                        <CIncome/>
                    </div>
                    <div className="tab-pane fade" id="success" role="tabpanel" aria-labelledby="success-tab">
                        <CIncome/>
                    </div>
                </div>
            </div>
        );
    }
}




export default CDetailPackage;