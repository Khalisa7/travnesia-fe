import React, { Component } from 'react'

import OwlCarousel from 'react-owl-carousel'
import './style/sMobileDetailPackage.css'
import ReadMoreReact from 'read-more-react'
import ProductService from './../../../_services/product/ProductDetail'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import ContentLoader from '../../ContentLoader/MobileView/MobileDetailTravelLoader'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import hotel from "./img/hotel.png";
import hours from "./img/24hours.png";
import bagage from "./img/suitcase.png";
import transport from "./img/taxi.png";
import meals from "./img/breakfast.png";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CartService from '../../../_services/customers/cart/CartService'
import image from './img/family.png'
import Alert from '../../../_services/alert/Alert'
import AccessControl from "./../../../_config/middleware/AccessControl";


class MDetailPackage extends Component {

	constructor(props) {
		super(props)
		this.CartService = new CartService()
		this.state = {
			filterIcon_1: true,
			data: [],
			count:1,
			startDate: this.CartService.formatDate(new Date()),
			content: <ContentLoader />,
            singleBooking: '',
            loader: true,
            date: '',
            selectedSubpackage: [],
            dateAlert: 'd-none'
		}

		this.getGuarantee = this.getGuarantee.bind(this)
        this.getFacility = this.getFacility.bind(this)
        this.ProductService = new ProductService()
        this.Alert = new Alert()
        this.CartService = new CartService()

		this.getGuarantee = this.getGuarantee.bind(this)
		this.getFacility = this.getFacility.bind(this)
        // this.fetchData = this.fetchData.bind(this)
        this.AccessControl = new AccessControl();
		this.ProductService = new ProductService()
	}

	increment(i) {
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
	

	componentDidMount() {
		let slug = this.props.data
		this.ProductService.getDetail(slug)
			.then(res => {
				let data_map = res.result.map(data => {
					return data
				})

				this.setState({ data: data_map })
				setTimeout(() => this.setState({ content: this.content() }), 1500)
			})
			.catch(err => {
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
					<div className='col-2 text-center' key={i}>
						<span>
							<img src={hotel} alt='' />
						</span>
					</div>
				)
			} else if (facility[i].includes('transportation')) {
				array.push(
					<div className='col-2 text-center' key={i}>
						<span>
							<img src={transport} alt='transport' />
						</span>
					</div>
				)
			} else if (facility[i].includes('meals')) {
				array.push(
					<div className='col-2 text-center' key={i}>
						<span>
							<img src={meals} alt='meals' />
						</span>
					</div>
				)
			} else {
				array.push(
					<div className='col-2 text-center' key={i}>
						<span>
							<img src={bagage} alt='bagage' />
						</span>
					</div>
				)
			}
		} return array
	}

	getGuarantee(data) {
		var array = []
		var guarantee = data.split(",")
		for (let i = 0; i < guarantee.length; i++) {
			if (guarantee[i].includes('refund')) {
				array.push(
					<li className='d-inline-block mr-4' key={i}>
						<i className='fa fa-money d-inline-block text-black-50' />
						<div className='d-inline-block ml-3'>
							<p>
								Jaminan uang kembali
                            </p>
						</div>
					</li>
				)
			} else if (guarantee[i].includes('flexible')) {
				array.push(
					<li className='d-inline-block mr-4' key={i}>
						<i className='fa fa-print d-inline-block text-black-50' />
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
						<i className='fa fa-calendar d-inline-block text-black-50' />
						<div className='d-inline-block ml-3'>
							<p>
								Open Date Ticket
                            </p>
						</div>
					</li>
				)
			} else {
				array.push(
					<li className='d-inline-block mr-4' key={i}>
						<i className='fa fa-ticket d-inline-block text-black-50' />
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
    
	rotateIcon() {
		this.setState(state => ({
			filterIcon_1: !state.filterIcon_1
		}))
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
	
	// rederect
	handleDayChange(selectedDay) {
        this.state.date = selectedDay
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

	checkSubPackage(el) {
        el.preventDefault()
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
    
    book(el){
        el.preventDefault()
        var logedIn = this.AccessControl.loggedIn()
        if(logedIn === false){
            window.location="/signin"
        }
        else{
            return this.CartService.updateItem(
                this.state.data[0].package_id,
                null,
                document.getElementById("paxCount").value,
                this.state.startDate
            ).then(res => {
                window.location = '/checkout/' + res.data.result.token
            }).catch(err => {
                console.log(err)
                this.Alert.error('Gagal Menambahkan', 'Silahkan coba kembali')
            })
        }
        
    }
	
	
	// end redirect
	content() {
		return (
			<div>
				{this.state.data.map((data_map, i) => {
					return (
						<div className='m-detail-package' key={i}>
							<div className='carousel' >
								<div className='carousel-inner'>
										<img src={process.env.REACT_APP_CDN_PRODUCT + data_map.image} alt=''/>
								</div>
							</div>
							<div className='card rounded-0 border-0'>
								<div className='card-body border-0'>
									<h5>{data_map.name}</h5>
									<div className="d-flex">
										<div className="">
											<p className="m-detail-review">4.2</p>
										</div>
										<div className="m-detail-star">
											<span>
												<i className="fa fa-star"></i>
												<i className="fa fa-star"></i>
												<i className="fa fa-star"></i>
												<i className="fa fa-star"></i>
											</span>
											<p className="m-detail-ulasan">200 Ulasan</p>
										</div>
									</div>
									<hr className="m-detail-hr" />
									<div className="d-flex">
										<div className="m-detail-status">
											<span className="small-text">
												<i className='fa fa-users ' />
											</span>
											<p>120 Kali Dipesan</p>
										</div>
										<div className="m-detail-status">
											<span className="small-text">
												<i className='fa fa-calendar ' />
											</span>
											<p>Avaible Today</p>
										</div>
									</div>
									<br />

									<div className="m-detail-service">
										<div className="row">
											<div className="col-2 m-detail-service-icon col-centered">
												<span>
													<i className='fa fa-dollar' />
												</span>
											</div>
											<div className="col-10">
												<h6>Pembatalan GRATIS sebelum 2x24 jam</h6>
											</div>
										</div>
										<div className="row">
											<div className="col-2 m-detail-service-icon col-centered">
												<span>
													<i className='fa fa-globe ' />
												</span>
											</div>
											<div className="col-10"  >
												<h6>Bahasa Indonesia/ Inggris/ Blanda</h6>
											</div>
										</div>
									</div>
									<div className=' description-detail-city'>
										<div className="icon-n">
											<div className="">
												<span className="classs">
													<div></div>
												</span>
											</div>
											<div className="" >
												<h6>Deskripsi</h6>
											</div>
										</div>

                                        <div dangerouslySetInnerHTML={{__html:data_map.id_desc}} />      

										<div className="icon-n" style={{ marginBottom: -10 + 'px', marginTop: 20 + 'px' }}>
											<div className="">
												<span className="classs">
													<div></div>
												</span>
											</div>
											<div className="" >
												<h6>Fasilitas</h6>
											</div>
										</div>
										<div className='row   mt-1 facility text-center'>
											{this.getFacility(data_map.facility)}
										</div>

										<div className="icon-n" style={{ marginBottom: -10 + 'px', marginTop: 20 + 'px' }}>
											<div className="">
												<span className="classs">
													<div></div>
												</span>
											</div>
											<div className="" >
												<h6>Itenary</h6>
											</div>
										</div>
										<div className='row ml-0 mr-0 mt-2 mb-3 '>

											{data_map.itinerary.map((data, i) => {
												return (
													<div className='col-12 mt-2 px-0'>
														<div className='card shadow-sm'>
															<div className='card-header' data-toggle='collapse'
																data-target={'#collapseItenarary'+i}
																aria-expanded='false'
                                                                aria-controls={'collapseItenarary'+i}>
																<span>Day {i + 1}</span>
															</div>
															<div className='collapse' id={'collapseItenarary'+i}>
																<div className='col-12' key={i}>
                                                                    <div dangerouslySetInnerHTML={{__html:data.description}} />
																</div>
															</div>
														</div>
													</div>
												)
											})}
										</div>
										<div className="icon-n" style={{ marginBottom: -10 + 'px', marginTop: 20 + 'px' }}>
											<div className="">
												<span className="classs">
													<div></div>
												</span>
											</div>
											<div className="" >
												<h6>Feedback</h6>
											</div>
										</div>
										<div className='row ml-0 mr-0 x-scroll   mt-2 mb-3'>
											<OwlCarousel className="owl-theme" loop={false} nav={false} dots={false} margin={5} stagePadding={10} items={1}>

												<div className='col-12 mt-2 px-0'>
													<div className='card shadow-sm'>
														<div className='card-header' data-toggle='collapse' data-target='#collapseFeedback2' aria-expanded='false' aria-controls='collapseFeedback2'>
															<span>Main Enak</span>
															<img src="https://via.placeholder.com/60" className="rounded-circle float-right" alt="" />
															<p>
																<i className='fa fa-star' />
																<i className='fa fa-star' />
																<i className='fa fa-star' />
																<i className='fa fa-star' />
																<i className='fa fa-star' />
															</p>
														</div>
														<div className='collapse' id='collapseFeedback2'>
															<div className='col-12'>
																<p>Kenapa sih orang tidur itu matanya merem?
																coba bayangin aja ya kita tidur gak bisa lihat apa apa
																terus tiba tiba meteor menghujani makam sinetron azab
													jadinya kan kita gak bisa lihat apa apa</p>
															</div>
														</div>
													</div>
												</div>
												<div className='col-12 mt-2 px-0'>
													<div className='card shadow-sm'>
														<div className='card-header' data-toggle='collapse' data-target='#collapseFeedback4' aria-expanded='false' aria-controls='collapseFeedback4'>
															<span>Main Enak</span>
															<img src="https://via.placeholder.com/60" className="rounded-circle float-right" alt="" />
															<p>
																<i className='fa fa-star' />
																<i className='fa fa-star' />
																<i className='fa fa-star' />
																<i className='fa fa-star' />
																<i className='fa fa-star' />
															</p>
														</div>
														<div className='collapse' id='collapseFeedback4'>
															<div className='col-12'>
																<p>Kenapa sih orang tidur itu matanya merem?
																coba bayangin aja ya kita tidur gak bisa lihat apa apa
																terus tiba tiba meteor menghujani makam sinetron azab
													jadinya kan kita gak bisa lihat apa apa</p>
															</div>
														</div>
													</div>
												</div>

												<div className='col-12 mt-2 px-0'>
													<div className='card shadow-sm'>
														<div className='card-header' data-toggle='collapse'
															data-target='#collapseFeedback3'
															aria-expanded='false'
															aria-controls='collapseFeedback3'>

															<span>Main Enak</span>
															<img src="https://via.placeholder.com/60" className="rounded-circle float-right" alt="" />

															<p>
																<i className='fa fa-star' />
																<i className='fa fa-star' />
																<i className='fa fa-star' />
																<i className='fa fa-star' />
																<i className='fa fa-star' />
															</p>

														</div>
														<div className='collapse' id='collapseFeedback3'>
															<div className='col-12'>
																<p>Kenapa sih orang tidur itu matanya merem?
																coba bayangin aja ya kita tidur gak bisa lihat apa apa
																terus tiba tiba meteor menghujani makam sinetron azab
													jadinya kan kita gak bisa lihat apa apa</p>
															</div>
														</div>
													</div>
												</div>
											</OwlCarousel>
										</div>
									</div>
								</div>
							</div>
							<footer className="fixed-bottom bottom-menu bottom-top" style={{ height: 80 + "px" }}>
								<div className="row ">
									<div className="col-12 text-center">
										<span style={{ fontSize: 18 }}>
											{new Intl.NumberFormat('ID', {
												style: 'currency',
												currency: 'IDR',
												minimumFractionDigits: 0,
												maximumFractionDigits: 0
											}).format(data_map.base_price)},- /<small>Pax</small>
										</span>
										<div className="btn btn-danger btn-block mt-1" data-toggle="modal" data-target="#lab-slide-bottom-popup">
											Book Now</div>
									</div>
								</div>
							</footer>
							<div className="modal fade" id="lab-slide-bottom-popup" tabIndex="-1" role="dialog" aria-labelledby="lab-slide-bottom-popup" aria-hidden="true">
								<div className="modal-dialog" role="document">
									<div className="modal-content">
										<div className="modal-header bg-danger">
											<h5 className="modal-title text-white" id="exampleModalLabel">Booking</h5>
											<button type="button" className="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										
										<div className="modal-body">
											<div className="row">
												<div className="col-12">
													<h4 className="px-3 pt-4">{data_map.name}</h4>
													<h3 className="px-3"><span>
                                                        {new Intl.NumberFormat('ID', {
                                                            style: 'currency',
                                                            currency: 'IDR',
                                                            minimumFractionDigits: 0,
                                                            maximumFractionDigits: 0
                                                        }).format(data_map.base_price)},- /<small>Pax</small>
                                                    </span></h3>
													<form action="travel/search" method="get" className="p-3">
														<div className="row">
															<div className="col-6">
																<div className="form-group">
																	<label htmlFor="txtTujuan"> Tanggal Berangkat</label><br/>
																	<DatePicker className="form-control"
																		disableDays={[{ before: new Date() }]}
																		value={this.state.startDate}
																		onDayChange={this.handleDayChange.bind(this)}
																		minDate={new Date()}
																		name="date"
																	/>
																</div>
															</div>
															<div className='form-group col-6'>
                                                                    <label htmlFor=''>Input Pax</label>
                                                                    <div className="count-pakage">
																		<div className="input-pack">
                                                                            <button onClick={(e) => { e.preventDefault(); this.decrement() }} className="fa fa-minus count-pakageLeft btn btn-warning btn-sm"></button>
                                                                            <input type="number" className="m-detail-input counter form-inline form-control rounded-0 bg-white" value={this.state.count} id="paxCount" required readOnly />
                                                                            <button onClick={(e) => { e.preventDefault(); this.increment() }} className="fa fa-plus count-pakageRight btn btn-warning btn-sm"></button>
                                                                        </div>
                                                                    </div>
                                                                </div>
															<div className="col-12 mt-2">
																<div className="form-group">
																	<button className="btn btn-danger btn-block" onClick={(e) => this.book(e)} data-target={this.state.singleBooking}>Pesan Sekarang</button>
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
					)
				})}

			</div>
		)
	}

	render() {
		return (
			<div>
				{this.state.content}
			</div>
		)
	}
}
export default MDetailPackage
