import React, { Component } from 'react'

import OwlCarousel from 'react-owl-carousel'
import CRating from '../../Components/Public/cRating'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import './style/sMobileHeader.css'
import Translations from './../../../localization/translations.js'
import CartService from '../../../_services/customers/cart/CartService'
import LocalizedStrings from 'react-localization'


class MHeader extends Component {
    constructor(props) {
        super(props);
        this.CartService = new CartService()
        this.state = {
            visible1: false,
            visible2: false,
            startDate: this.CartService.formatDate(new Date()),
        }

        //Translations
        this.Translations = new Translations()
        var Locale = this.Translations.locale()
        this.lang = new LocalizedStrings({ Locale })
        this.handleChange = this.handleChange.bind(this)
    }

    openModal(data) {
        switch (data) {
            case 1:
                this.setState({
                    visible1: true
                });
                break;
            case 2:
                this.setState({
                    visible2: true
                });
                break;
            case 3:
                this.setState({
                    visible3: true
                });
                break;
            case 4:
                this.setState({
                    visible4: true
                });
                break;
            case 5:
                this.setState({
                    visible4: true
                });
                break;
        }

    }

    closeModal(data) {
        switch (data) {
            case 1:
                this.setState({
                    visible1: false
                });
                break;
            case 2:
                this.setState({
                    visible2: false
                });
                break;
            case 3:
                this.setState({
                    visible3: false
                });
                break;
            case 4:
                this.setState({
                    visible4: false
                });
                break;
            case 5:
                this.setState({
                    visible4: false
                });
                break;
        }
    }

    handleChange(date) {
        let date_format = this.CartService.formatDate(date)
        this.setState({
            startDate: date_format
        });
    }

    render() {
        return (
            <div className="m_Header">
                <div className="container-fluid pt-4">
                    <div className="row">
                        <div className="col-md-12 px-0">
                            <OwlCarousel className="owl-theme" loop={false} nav={false} dots={false} margin={10} stagePadding={20} items={1} >
                                <div className="item">
                                    <div className="card border-0">
                                        <div className="card-body px-0" >
                                            <h2 className="text-left text-white m-auto">
                                                Tripdize
                                            </h2>
                                            <h6 className="text-left text-white m-auto">
                                                Liburan tak pernah semudah ini
                                            </h6>
                                            <p className="text-white">We Make It Simple</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="item shadow-sm">
                                    <div className="card">
                                        <div className="card-body p-0">
                                            <a href="">
                                                <img src="https://tvlk.imgix.net/imageResource/2018/12/31/1546272132869-7853fe3efec6299c8fb4f3c2a5e0a0a8.png" alt="" className="position-relative" />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="item shadow-sm">
                                    <div className="card">
                                        <div className="card-body p-0">
                                            <a href="">
                                                <img src="https://tvlk.imgix.net/imageResource/2018/12/31/1546272132869-7853fe3efec6299c8fb4f3c2a5e0a0a8.png" alt="" className="position-relative" />
                                            </a>
                                        </div>
                                    </div>
                                </div>



                                <div className="item shadow-sm">
                                    <div className="card">
                                        <div className="card-body p-0">
                                            <a href="">
                                                <img src="https://tvlk.imgix.net/imageResource/2018/12/31/1546272132869-7853fe3efec6299c8fb4f3c2a5e0a0a8.png" alt="" className="position-relative" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
                <div className="container-fluid py-2 m_Search">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="row justify-content-center">
                                <div className="col-3 card card-body bg-white m-1 px-0 border-0 shadow-sm travel float-left" data-toggle="modal" data-target="#lab-slide-bottom-popup" >
                                    <p>Travel</p>
                                </div>
                                <div className="col-3 card card-body bg-white m-1 px-0 border-0 shadow-sm event-ticket float-left" onClick={() => this.openModal(2)} >
                                    <p>Event</p>
                                </div>
                                <div className="col-3 card card-body bg-white m-1 px-0 border-0 shadow-sm honey-moon float-left" onClick={() => this.openModal(3)} >
                                    <p>Honeymoon</p>
                                </div>
                                <div className="col-3 card card-body bg-white m-1 px-0 border-0 shadow family-vacation" onClick={() => this.openModal(4)} >
                                    <p>Family</p>
                                </div>
                                <div className="col-3 card card-body bg-white m-1 px-0 border-0 shadow tiket-konser float-leftq" onClick={() => this.openModal(4)} >
                                    <p>Concert</p>
                                </div>
                                <div className="col-3 card card-body bg-white m-1 px-0 border-0 shadow promo" onClick={() => this.openModal(5)} >
                                    <p>Promo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="lab-slide-bottom-popup" tabIndex="-1" role="dialog" aria-labelledby="lab-slide-bottom-popup" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-danger">
                                <h5 className="modal-title text-white" id="exampleModalLabel">Travel</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12">
                                        <h5 className="px-3 pt-4"> {this.lang.search_box_title} </h5>
                                        <h6 className="px-3"> We Make It Simple </h6>
                                        <form action="travel/search" method="get" className="p-3">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="txtTujuan"> {this.lang.destination} </label>
                                                        <input type="text" className="form-control" name="q" id="txtTujuan" aria-describedby="txtTujuan" placeholder="Bali, Lombok, Yogyakarta" />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="txtKategori"> {this.lang.travel_category} </label>
                                                        <input type="text" className="form-control" name="category" id="txtKategori" aria-describedby="txtKategori" placeholder="City Tour, Family, Outbound" />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="form-group">
                                                        <label htmlFor="txtPax"> Jumlah </label>
                                                        <input type="text" className="form-control" name="qty" id="txtPax" aria-describedby="txtPax" placeholder="Jumlah Pax" />

                                                    </div>
                                                </div>
                                                <div className="col-8">
                                                    <div className="form-group">
                                                        <label>
                                                            Rating
                                                        </label>
                                                        <CRating />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="txtPax"> Tanggal </label> <br />
                                                        <DatePicker className="form-control"
                                                            disableDays={[{ before: new Date() }]}
                                                            value={this.state.startDate}
                                                            onChange={this.handleChange}
                                                            minDate={new Date()}
                                                            name="date"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <button className="btn btn-travnesia col-8 float-right" type="submit" >
                                                            {this.lang.travel_search_btn}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MHeader