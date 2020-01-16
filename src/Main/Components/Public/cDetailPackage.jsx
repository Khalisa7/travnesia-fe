import React, { Component, Fragment } from 'react'
import scrollToComponent from 'react-scroll-to-component'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import './style/sDetailPackage.css'
import ProductService from './../../../_services/product/ProductDetail'
import ContentLoader from './../../ContentLoader/DesktopView/PackageDetailLoader'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import CartService from '../../../_services/customers/cart/CartService'
import Axios from 'axios';
import Alert from '../../../_services/alert/Alert'
import AccessControl from '../../../_config/middleware/AccessControl';
import HomeManifest from '../../../_services/home/HomeManifest.js'
import Translations from './../../../localization/translations.js'
import LocalizedStrings from 'react-localization'
import flight from "./img/plane.png";
import meals from "./img/breakfast.png";
import bagage from "./img/suitcase.png";
import transportation from './img/taxi.png';
import hotel from './img/hotel.png';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'

const faStyle = {
    fontSize: '1.2rem'
}

class CDetailPackage extends Component {
    constructor(props) {
        super(props)

        //Translations
        this.Translations = new Translations()
        var Locale = this.Translations.locale()
        this.lang = new LocalizedStrings({ Locale })

        //Translations
        this.Translations = new Translations()
        var Locale = this.Translations.locale()
        this.lang = new LocalizedStrings({ Locale })

        this.state = {
            open: false,
            filterIcon_1: true,
            data: [],
            content: <ContentLoader />,
            singleBooking: '',
            loader: true,
            date: '',
            count: 1,
            selectedSubpackage: [],
            dateAlert: 'd-none'
        }

        this.getGuarantee = this.getGuarantee.bind(this)
        this.getFacility = this.getFacility.bind(this)
        this.ProductService = new ProductService()
        this.Alert = new Alert()
        this.CartService = new CartService()
        this.sendData = this.sendData.bind(this)

        //Translations
        this.Translations = new Translations()
        var Locale = this.Translations.locale()
        this.lang = new LocalizedStrings({ Locale })

        // this.openModal = this.openModal.bind(this)
        // this.handleClickEmail = this.handleClickEmail.bind(this)
        this.handleDayChange = this.handleDayChange.bind(this)


    }

    componentDidMount() {
        let slug = this.props.data
        this.ProductService.getDetail(slug)
            .then(res => {
                let data_map = res.result.map(data => {
                    document.title = "Paket Liburan Murah " + data.name + " - " + process.env.REACT_APP__NAME
                    if (data.subpackages < 1) {
                        this.setState({ singleBooking: '#singleBooking' })
                    }
                    return data
                })
                this.setState({ data: data_map })
                this.setState({ content: this.content() })
                setTimeout(() => this.setState({ loader: false }), 900)
            })
            .catch(err => {
                console.log(err)
                var error = this.error()
                setTimeout(function (error) {
                    return error
                }, 30000)
            })
    }

    error() {
        return confirmAlert({
            title: 'Opsss...',
            message: 'Something went wrong. Our team is trying hard to handle it.',
            buttons: [
                {
                    label: 'Okay',
                    onClick: () => {
                        window.location = '/'
                    },
                }
            ]
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
                            <img src={hotel} alt='Include Hotel' />
                            <h6 className="facility-name">Hotel</h6>
                        </span>
                    </div>
                )
            } else if (facility[i].includes('transportation')) {
                array.push(
                    <div className='col text-center' key={i}>
                        <span>
                            <img src={transportation} alt='Include Transportation' />
                            <h6 className="facility-name">Transportation</h6>
                        </span>
                    </div>
                )
            } else if (facility[i].includes('flight-oneway')) {
                array.push(
                    <div className='col text-center' key={i}>
                        <span>
                            <img src={flight} alt='Include One Way Flight' />
                            <h6 className="facility-name">Flight (Pergi)</h6>
                        </span>
                    </div>
                )
            } else if (facility[i].includes('flight-twoway')) {
                array.push(
                    <div className='col text-center' key={i}>
                        <span>
                            <img src={flight} alt='Include Two Way Flight' />
                            <h6 className="facility-name">Flight (Pulang-Pergi)</h6>
                        </span>
                    </div>
                )
            } else if (facility[i].includes('meals')) {
                array.push(
                    <div className='col text-center' key={i}>
                        <span>
                            <img src={meals} alt='Include Meals' />
                            <h6 className="facility-name">Meals</h6>
                        </span>
                    </div>)
            } else if (facility[i].includes('bagage')) {
                array.push(
                    <div className='col text-center' key={i}>
                        <span>
                            <img src={bagage} alt='Include Bagage' />
                            <h6 className="facility-name">Bagage</h6>
                        </span>
                    </div>)
            }
        }
        return array

    }

    checkSubPackage() {
        const formatter = new Intl.NumberFormat(this.lang.code, {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 2
        })
        try {
            if (this.state.data[0].subpackages.length != 0) {
                scrollToComponent(this.list_package, { offset: -250, align: 'top', duration: 1500 })
            } else {
                return false;
            }
        } catch (err) {
            return err
        }
    }

    getGuarantee(data) {
        var array = []
        var guarantee = data.split(",")
        for (let i = 0; i < guarantee.length; i++) {
            if (guarantee[i].includes('refund')) {
                array.push(
                    <li className='d-inline-block mr-4' key={i}>
                        <i className='fa fa-money d-inline-block text-black-50' style={faStyle} />
                        <div className='d-inline-block ml-3'>
                            <p>
                                Jaminan uang kembali
                            </p>
                        </div>
                    </li>)
            } else if (guarantee[i].includes('flexible')) {
                array.push(
                    <li className='d-inline-block mr-4' key={i}>
                        <i className='fa fa-print d-inline-block text-black-50' style={faStyle} />
                        <div className='d-inline-block ml-3'>
                            <p>
                                Cetak atau Tunjukkan Mobile Voucher
                            </p>
                        </div>
                    </li>
                )
            } else if (guarantee[i].includes('fastcheckin')) {
                array.push(
                    <li className='d-inline-block mr-4' key={i}>
                        <i className='fa fa-calendar d-inline-block text-black-50' style={faStyle} />
                        <div className='d-inline-block ml-3'>
                            <p>
                                Open Date Ticket
                            </p>
                        </div>
                    </li>)
            } else {
                array.push(
                    <li className='d-inline-block mr-4' key={i}>
                        <i className='fa fa-ticket d-inline-block text-black-50' style={faStyle} />
                        <div className='d-inline-block ml-3'>
                            <p>
                                Masuk Langsung dengan Voucher
                            </p>
                        </div>
                    </li>
                )
            }
            return array
        }
    }

    formatCurrency(amount, decimalCount = 2, decimal = '.', thousands = ',') {
        try {
            decimalCount = Math.abs(decimalCount)
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount

            const negativeSign = amount < 0 ? '-' : ''

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString()
            let j = (i.length > 3) ? i.length % 3 : 0

            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '')
        } catch (e) {
            console.log(e)
        }
    }

    handleDayChange(selectedDay) {
        this.state.date = selectedDay
    }

    increment(i) {
        console.log(this.state.data)
        if (i === undefined) {
            var count_i = document.getElementById("paxCount").value;
            if (count_i > 0) {
                document.getElementById("paxCount").value = parseInt(count_i) + 1;
            }
        }
        else {
            var count_i = document.getElementById("paxCount" + i).value;
            if (count_i > 0) {
                document.getElementById("paxCount" + i).value = parseInt(count_i) + 1;
            }
        }
    }

    decrement(i) {
        if (i === undefined) {
            var count_d = document.getElementById("paxCount").value;
            if (count_d > 1) {
                document.getElementById("paxCount").value = parseInt(count_d) - 1;
            }
        }
        else {
            var count_d = document.getElementById("paxCount" + i).value;
            if (count_d > 1) {
                document.getElementById("paxCount" + i).value = parseInt(count_d) - 1;
            }
        }
    }


    sendData(e, i) {
        e.preventDefault();
        var packageId = this.state.data[0].package_id
        var checkSubPackage = this.state.data[0].subpackages
        var totalPax = 0;
        if (i === 0) {
            totalPax = document.getElementById("paxCount").value
        }
        else {
            totalPax = document.getElementById("paxCount" + i).value
        }
        var deparatureDate = this.CartService.formatDate(this.state.date)
        var getSession = localStorage.getItem('travnesia_loggedin')
        var subPackageId;

        if (!this.state.date) {
            this.Alert.warning('Oppss...', 'Silahkan pilih tanggal keberangkatan')
        } else {

            if (document.getElementById("subpackage_id")) {
                var getSubPackage = document.getElementById("subpackage_id").value
                if (checkSubPackage && checkSubPackage.find(id => id.product_id === getSubPackage)) {
                    subPackageId = getSubPackage
                } else {
                    subPackageId = null
                }
            }

            if (!getSession) {
                localStorage.setItem('last_page', window.location.href)
                window.location = '/signin'
            } else {
                return this.CartService.updateItem(
                    packageId,
                    subPackageId,
                    totalPax,
                    deparatureDate
                ).then(res => {
                    window.location = '/checkout/' + res.data.result.token
                }).catch(err => {
                    console.log(err)
                    this.Alert.error('Gagal Menambahkan', 'Silahkan coba kembali')
                })
            }
        }

    }

    content() {
        const formatter = new Intl.NumberFormat(this.lang.code, {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 2
        })

        const dateFormat = 'D/M/YYYY';

        return (
            <div className='container'>
                {this.state.data.map((data_map, i) => {
                    return (
                        <div className='row' key={i} >
                            <div className='col-md-8'>
                                <div className='row'>
                                    <div className='col'>
                                        {/* Package detail */}
                                        <div className='card shadow-sm rounded-0'>
                                            <div className='carousel slide ' id='imageSlides' data-ride='carousel'>
                                                <div className='carousel-inner'>
                                                    <div className='carousel-item active'>
                                                        <img className='d-block w-100' src={process.env.REACT_APP_CDN_PRODUCT + data_map.image} alt='First slide' />
                                                    </div>
                                                </div>
                                            </div>
                                            <br />
                                            {/* detail package body */}
                                            <div className='card-body'>
                                                <div className='page-heading'>
                                                    <div className='clearfix'>
                                                        <h3 className='float-left'>
                                                            {data_map.name}
                                                        </h3>
                                                    </div>
                                                    <span>
                                                        Partner: {data_map.vendor.company_name}
                                                    </span>
                                                </div>
                                                <br />

                                                {/* guarantees */}
                                                <ul className='border-top border-bottom pl-0 pt-3 list-unstyled'>
                                                    {this.getGuarantee(data_map.guarantee)}
                                                </ul>
                                                {/* end of guarantess */}

                                                <div className='clearfix'>
                                                    <h5 className='float-left'>Deskripsi</h5>
                                                </div>
                                                <p className='description' dangerouslySetInnerHTML={{__html:data_map.id_desc}} />
                                                <br />

                                                <div className='border-bottom list-unstyled clearfix'>
                                                    <h5 className='float-left'>Sudah Termasuk</h5>
                                                </div>

                                                {/* facilities */}
                                                <div className='collapse show' id='collapseFasilitas'>
                                                    <div className='row'>
                                                        {this.getFacility(data_map.facility)}
                                                    </div>

                                                </div>
                                                {/* end of faciliries */}
                                                <br />

                                                <div className='border-bottom list-unstyled clearfix'>
                                                    <h5 className='float-left'>Itenerary</h5>
                                                </div>

                                                {data_map.itinerary.map((data, i) => {
                                                    return (
                                                        <div className='col-12 mt-2 px-0 float-left' key={i}>
                                                            <div className='card shadow-sm'>
                                                                <div className='card-header' data-toggle='collapse'
                                                                    data-target='#collapseItenarary2'
                                                                    aria-expanded='false'
                                                                    aria-controls='collapseItenarary2'>
                                                                    <span>Day {i + 1}</span>
                                                                </div>
                                                                <div className='collapse' id='collapseItenarary2'>
                                                                    <div className='col-12' key={i}>
                                                                        <div className='description' dangerouslySetInnerHTML={{__html:data.description}} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                            </div>

                                            {/* end of detail package body */}
                                        </div>
                                        {/* end Package Detail */}
                                    </div>
                                </div>

                                <div className="modal fade singleBooking" id="singleBooking" tabIndex="-1" role="dialog" aria-labelledby="singleBooking" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content" > 
                                            <form onSubmit={(e) => { this.sendData(e, 0) }}>
                                                <div className="modal-header border-0">
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="card mb-3">
                                                                <div className="row no-gutters">
                                                                    <div className="col-md-4">
                                                                        <img src={process.env.REACT_APP_CDN_PRODUCT + data_map.image} className="card-img" alt="..." style={{ height: 100 + "%", objectFit: "cover" }} />
                                                                    </div>
                                                                    <div className="col-md-8">
                                                                        <div className="card-body">
                                                                            <h5 className="card-title">{this.state.data[0].name}</h5>
                                                                            <p className="card-text">{this.state.data[0].vendor.company_name}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            {/* Currency Format */}
                                                            <h4>{formatter.format(data_map.base_price)}
                                                            </h4>
                                                            <div className='form-row'>
                                                                <div className='form-group col-12'>
                                                                    <label htmlFor=''>Tanggal Berangkat</label>
                                                                    <DayPickerInput placeholder="Tanggal Berangkat"
                                                                        format={'D/M/YYYY'}
                                                                        onDayChange={this.handleDayChange.bind(this)}
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className='form-group col-12'>
                                                                    <label htmlFor=''>Input Pax</label>
                                                                    <div className="count-pakage">
                                                                        <div className="input-pack">
                                                                            <button onClick={(e) => { e.preventDefault(); this.decrement() }} className="fa fa-minus count-pakageLeft btn btn-warning btn-sm"></button>
                                                                            <input type="text" className="number counter form-inline" value={this.state.count} id="paxCount" required readOnly />
                                                                            <button onClick={(e) => { e.preventDefault(); this.increment() }} className="fa fa-plus count-pakageRight btn btn-warning btn-sm"></button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group col-12">
                                                                    <button className='btn btn-warning text-white'>Pesan Sekarang</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className='page-heading pt-4 pb-4'>
                                    {data_map.subpackages < 1 ? null : <h5>Pilihan Paket</h5>}
                                </div>

                                {/* Subpackage's card */}
                                <div ref={(section) => { this.list_package = section }}>
                                    {data_map.subpackages.map((data, i) => {
                                        return (
                                            <div className="row" key={i}>
                                                <div className='col-12 pb-4'>
                                                    <div className='card shadow-sm rounded-0'>
                                                        <div className='card-body'>
                                                            <div className='media'>
                                                                <div className='media-body pt-2'>
                                                                    <div className='clearfix'>
                                                                        <span className='float-left'>
                                                                            <h6 key={i}>{data.name}</h6>
                                                                            <a className='detail-subpackage' href='' data-toggle='collapse' data-target={'#morePackage' + i} aria-expanded='false' aria-controls={'morePackage' + i}>Rincian Paket</a>
                                                                        </span>
                                                                        <h6 className='float-right f-primary-color mr-4' key={i}>Rp {this.formatCurrency(data.basePrice)} <small> /pax</small></h6>
                                                                    </div>
                                                                </div>
                                                                <button type="button" className='btn btn-warning' data-toggle="modal" data-target={"#modalBooking" + i} >
                                                                    Pilih Paket
                                                                </button>
                                                            </div>
                                                            <div className='collapse' id={'morePackage' + i}>
                                                                <div className='card'>
                                                                    <div className='card-body'>
                                                                        <div key={i} >
                                                                            {data.description}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="modal fade" id={"modalBooking" + i} tabIndex="-1" role="dialog" aria-labelledby={"modalBooking"} aria-hidden="true">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content ">
                                                            <form onSubmit={(e) => { this.sendData(e, i) }}>
                                                                <div className="modal-header border-0">
                                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <div className="card mb-3">
                                                                                <div className="row no-gutters">
                                                                                    <div className="col-md-12">
                                                                                        <img src={process.env.REACT_APP_CDN_PRODUCT + data_map.image} className="card-img" alt="..." style={{ height: 100 + "%", objectFit: "cover" }} />
                                                                                    </div>
                                                                                    <div className="col-md-12">
                                                                                        <div className="card-body">
                                                                                            <h5 className="card-title">{this.state.data[0].name}</h5>
                                                                                            <p className="card-text">{this.state.data[0].subpackages[i].name}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            {/* Currency Format */}
                                                                            <h4>{formatter.format(data.base_price)}
                                                                            </h4>
                                                                            <div className='form-row'>
                                                                                <div className='form-group col-12'>
                                                                                    <label htmlFor=''>Tanggal Berangkat</label>
                                                                                    <DayPickerInput placeholder="Tanggal Berangkat"
                                                                                        // className="is-invalid"
                                                                                        format={'D/M/YYYY'}
                                                                                        value={this.state.date}
                                                                                        onDayChange={this.handleDayChange.bind(this)}
                                                                                        required
                                                                                    />
                                                                                    <span className={"text-danger " + this.state.dateAlert}> Anda harus memilih tanggal keberangkatan</span>
                                                                                    <input type="text" className="sub_packages" defaultValue={data.product_id} id="subpackage_id" hidden></input>
                                                                                </div>
                                                                                <div className='form-group col-12'>
                                                                                    <label htmlFor=''>Input Pax</label>
                                                                                    <div className="count-pakage">
                                                                                        <div className="input-pack">
                                                                                            <button onClick={(e) => { e.preventDefault(); this.decrement(i) }} className="fa fa-minus count-pakageLeft btn btn-warning btn-sm"></button>
                                                                                            <input type="text" className="number counter form-inline" value={this.state.count} id={"paxCount" + i} required readOnly></input>
                                                                                            <button onClick={(e) => { e.preventDefault(); this.increment(i) }} className="fa fa-plus count-pakageRight btn btn-warning btn-sm"></button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="form-group col-12">
                                                                                    <button className='btn btn-warning text-white'>Pesan Sekarang</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>


                            <div className='col-md-4 sticky pb-4'>
                                <div className='card rounded-0 shadow-sm'>
                                    <div className="card-header">
                                        <span><i className='fa fa-bookmark-o fa-fw f-primary-color' /> Pemesanan Cepat</span>
                                    </div>
                                    <div className='card-body book'>
                                        <strong><h4>Rp {this.formatCurrency(data_map.base_price)} <small>/pax</small></h4></strong>
                                        <a className='btn btn-warning btn-block mt-4 text-white book-btn' onClick={() => this.checkSubPackage()} data-toggle="modal" data-target={this.state.singleBooking} >PESAN SEKARANG</a>
                                        <span><i className='fa fa-clock-o fa-fw' /> Tersedia {data_map.day_minimum_booking} Hari Sebelum Keberangkatan</span>
                                        <span><i className='fa fa-phone fa-fw' /> Konfirmasi Cepat</span>
                                        <hr />
                                        <div className='clearfix'>
                                            <span className='float-left'><i className='fa fa-fire fa-fw' /> Dapatkan 10 Point</span>
                                            <span className='float-right'><i className='fa fa-trophy fa-fw' /> Paket Rekomendasi</span>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className='card rounded-0 shadow-sm'>
                                    <div className="card-header">
                                        <span><i className='fa fa-comments-o fa-fw f-primary-color' /> Ulasan Terbaru</span>
                                    </div>
                                    <div className='card-body book'>
                                        <div className="row">
                                            <div className="col-8">
                                                <p>Customer Enak <span >
                                                    <i className='fa fa-star' />
                                                    <i className='fa fa-star' />
                                                    <i className='fa fa-star' />
                                                    <i className='fa fa-star' />
                                                    <i className='fa fa-star' />
                                                    | 5</span>
                                                </p>
                                            </div>
                                            <div className="col-4">
                                                <img src="https://via.placeholder.com/60" className="rounded-circle float-right" alt="" />
                                            </div>
                                            <div className="col-12">
                                                <p className='comment-text-feedback'><i>"Aku lagi tidur tapi tiba tiba aku lagi mandi gimana dong?"</i></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end of card side  */}
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <div>
                <Loading
                    show={this.state.loader}
                    color="red"
                />

                <div className='package_detail pt-5'>
                    <div>
                        {this.state.content}
                    </div>
                </div>
            </div>
        )
    }
}

export default CDetailPackage
