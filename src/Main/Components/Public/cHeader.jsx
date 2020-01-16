import React, { Component } from 'react'

import OwlCarousel from 'react-owl-carousel'
import CRating from './cRating'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import HomeManifest from '../../../_services/home/HomeManifest.js'
import Translations from './../../../localization/translations.js'
import LocalizedStrings from 'react-localization'
import CartService from '../../../_services/customers/cart/CartService'
import './style/sHeader.css'
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'


class CHeader extends Component {

    constructor(props) {
        super(props)
        this.CartService = new CartService()
        this.state = {
            destination: '',
            rangePrice: '0',
            starValue: '0',
            startDate: this.CartService.formatDate(new Date()),
            promotionImages: [],
            loader: true
        }
        this.Manifest = new HomeManifest()
        this.update_RangePrice = this.update_RangePrice.bind(this)

        //Translations
        this.Translations = new Translations()
        var Locale = this.Translations.locale()
        this.lang = new LocalizedStrings({ Locale })
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        document.title = "Tripdize.com - Cari Paket Liburan Seluruh Dunia"
        this.Manifest.getSlide()
            .then(res => {
                this.setState({ promotionImages: res.result })
                setTimeout(() => this.setState({ loader: false }), 900)
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentWillUnmount(){
        this.setState({})
    }

    handleChange(date) {
        let date_format = this.CartService.formatDate(date)
        this.setState({
            startDate: date_format
        });
    }

    update_RangePrice(event) {
        this.setState({ rangePrice: event.target.value })
    }

    formatCurrency(amount, decimalCount = 2, decimal = '.', thousands = ',') {
        try {
            decimalCount = Math.abs(decimalCount)
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount

            const negativeSign = amount < 0 ? '-' : ''

            let i = parseInt(
                (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
            ).toString()
            let j = i.length > 3 ? i.length % 3 : 0

            return (
                negativeSign +
                (j ? i.substr(0, j) + thousands : '') +
                i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
                (decimalCount
                    ? decimal +
                    Math.abs(amount - i)
                        .toFixed(decimalCount)
                        .slice(2)
                    : '')
            )
        } catch (e) {
            return false
        }
    }

    render() {
        return (
            <div>
                <Loading
                    show={this.state.loader}
                    color="red"
                />
                <div className="header">
                    <div className="container-fluid header-banner">
                        <div className="row justify-content-center">
                            <div className="col-md-10 px-0">
                                {this.state.promotionImages.length > 0 ? (
                                    <OwlCarousel className="owl-theme" loop={false} nav dots={false} margin={20} items={2} >
                                        <div className="item">
                                            <div className="card border-0">
                                                <div className="card-body" style={{ paddingTop: 18 + '%' }} >
                                                    <h1 className="text-left text-white m-auto">
                                                        Tripdize
                                                </h1>
                                                    <h3 className="text-left text-white m-auto">
                                                        Liburan tak pernah semudah ini
                                                </h3>
                                                </div>
                                            </div>
                                        </div>
                                        {this.state.promotionImages.map((data, i) => (
                                            <div className="item shadow-sm" key={i}>
                                                <div className="card">
                                                    <div className="card-body p-0">
                                                        <a href={data.redirect}>
                                                            <img src={process.env.REACT_APP_CDN_SLIDE + data.image} alt="" className="position-relative" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </OwlCarousel>
                                ) : (
                                        ''
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className="container home-search">
                        <div className="row justify-content-center">
                            <div className="col-md-9">
                                <div className="shadow rounded bg-white p-4">
                                    <div className="row">
                                        <div className="col-md-10 col-6">
                                            <h4 className="f-black-color"> {this.lang.search_box_title} </h4>
                                            <h5 className="f-black-color"> We Make It Simple </h5>
                                        </div>
                                        <div className="col-md-2 col-6 justify-content-end">

                                            <div className="row justify-content-end">
                                                <ul className="nav nav-pills mb-3 col-md-12" id="homeSearchPills" role="tablist" >
                                                    <li className="nav-item col-12 p-0">
                                                        <a id="pills-travel-tab" data-toggle="pill" href="#pills-travel" role="tab" aria-controls="pills-travel" aria-selected="true" >
                                                            <div className="card shadow-sm mt-1 mr-2 bg-white travel">
                                                                <div className="card-body p-0">
                                                                    <h6 className="position-absolute mb-0" style={{ bottom: 0, width: 100 + '%' }} >
                                                                        {this.lang.travel_icon_title}
                                                                    </h6>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    {/* <li className="nav-item col-6 p-0">
                                                        <a id="pills-ticket-tab" data-toggle="pill" href="#pills-ticket" role="tab" aria-controls="pills-ticket" aria-selected="true" >
                                                            <div className="card shadow-sm mt-1 mr-2 bg-white event-ticket">
                                                                <div className="card-body p-0">
                                                                    <h6 className="position-absolute mb-0" style={{ bottom: 0, width: 100 + '%' }} >
                                                                        {this.lang.event_icon_title}
                                                                    </h6>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li> */}

                                                </ul>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="tab-content" id="pills-tabContent" >
                                                <div className="tab-pane fade show active" id="pills-travel" role="tabpanel" aria-labelledby="pills-travel-tab" >
                                                    <form action='travel/search' method="get" >
                                                        <div className="row">
                                                            <div className="col-md-5">
                                                                <div className="form-group">
                                                                    <label htmlFor="txtTujuan"> {this.lang.destination} </label>
                                                                    <input type="text" className="form-control" id="txtTujuan" aria-describedby="txtTujuan" name="q" placeholder="Bali, Lombok, Yogyakarta" />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="txtKategori"> {this.lang.travel_category} </label>
                                                                    <input type="text" className="form-control" id="txtKategori" aria-describedby="txtKategori" name="category" placeholder="City Tour, Family, Outbound" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-7">
                                                                <div className="form-group">
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <label htmlFor="txtPax"> Jumlah Pax </label>
                                                                            <input type="text" className="form-control" id="txtPax" name="qty" aria-describedby="txtPax" placeholder="Jumlah Pax" />
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <label htmlFor="txtPax"> Tanggal </label>
                                                                            <DatePicker className="form-control"
                                                                                disableDays={[{ before: new Date() }]}
                                                                                value={this.state.startDate}
                                                                                onChange={this.handleChange}
                                                                                minDate={new Date()}
                                                                                name="date"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>
                                                                            Rating
                                                                </label>
                                                                        <CRating />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <button className="btn btn-travnesia col-6 float-right" type="submit" >
                                                                            {this.lang.travel_search_btn}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                {/* <div className="tab-pane fade" id="pills-ticket" role="tabpanel" aria-labelledby="pills-ticket-tab" >
                                                    <h5> {this.lang.event_box_title} </h5>
                                                    <form action="" method="post" >
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="txtEvent"> {this.lang.event_location} </label>
                                                                    <input type="text" className="form-control" id="txtTujuan" aria-describedby="txtTujuan" placeholder="Jakarta, Bandung, Surabaya" />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="txtKategori"> {this.lang.event_category} </label>
                                                                    <input type="text" className="form-control" id="txtKategori" aria-describedby="txtKategori" placeholder="Education, Technology, Business" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>
                                                                        Rating
                                                                </label>
                                                                    <CRating />
                                                                </div>
                                                                <div className="form-group">
                                                                    <button className="btn btn-warning col-6 float-right" type="submit" > {this.lang.event_search_btn} </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CHeader
