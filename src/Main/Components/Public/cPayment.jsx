import React, { Component } from 'react'
import Timer from './cTimer'
import './style/sPayment.css'
import AuthService from '../../../_services/customers/AuthService'
import PaymentService from '../../../_services/payment/PaymentService'
import Translations from '../../../localization/translations.js'
import LocalizedStrings from 'react-localization'
import Currency from 'react-currency-formatter'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Modal from 'react-responsive-modal';
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
const snap = window.snap

class CPayment extends Component {
	constructor(props) {
		super(props)
		this.state = {
			detail: '',
			payment: '',
			snapToken: '',
			product: [],
			orderStatus: '',
			paymentCountDown: null,
			paymentButton: '',
			buttonStatus: '',
			snapPay: null,
			copied: false,
			virtualAccount: '891087738557301',
			open: false,
			orderDetail: 'null',
			basePrice: 0,
			loader: true

		}
		this.Auth = new AuthService()
		this.Payment = new PaymentService()
		this.payButton = React.createRef()
		this.showPaymentModal = this.showPaymentModal.bind(this)

		//Translations
		this.Translations = new Translations()
		var Locale = this.Translations.locale()
		this.lang = new LocalizedStrings({ Locale })
	}

	onCopy = () => {
		this.setState({ copied: true });
	};

	onOpenModal = () => {
		this.setState({ open: true });
	};

	onCloseModal = () => {
		this.setState({ open: false });
	};

	onError() {
		return confirmAlert({
			title: 'Opsss...',
			message: 'Something went wrong',
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

	componentDidMount() {
		let orderId = this.getOrderId()
		this.Payment.paymentStatus(orderId)
			.then(res => {

				res.data.result.item.map((product, i) => {
					if (product.data.subpackage) {
						const getPrice = product.data.subpackage.base_price
						this.setState({ basePrice: getPrice })
					} else {
						const getPrice = product.data.base_price
						this.setState({ basePrice: getPrice })

					}
				})

				this.setState({ detail: res.data.result.detail })
				this.setState({ payment: res.data.result.payment })
				this.setState({ snapToken: res.data.result.token })
				this.setState({ orderStatus: this.orderStatus(res) })
				this.setState({ paymentCountDown: this.paymentTimer(res) })
				this.setState({ product: this.productList(res) })
				this.setState({ buttonStatus: this.buttonStatus(res) })
				this.setState({ loader: false })

			})
			.catch(err => {
				this.onError();
			})
	}

	getOrderId() {
		let getUrl = (new URL(document.location)).searchParams
		let orderId = getUrl.get("order_id")
		return orderId
	}

	orderStatus(res) {
		var orderStatus = res.data.result.detail.order_status
		if (orderStatus === '0') {
			var status = <a style={{ marginBottom: 50 + 'px', color: 'white' }} className='btn btn-danger btn-md'>{this.lang.payment_unpaid}</a>
		} else if (orderStatus === 'pending') {
			var status = <a style={{ marginBottom: 50 + 'px', color: 'white' }} className='btn btn-warning btn-md'>{this.lang.waiting_payment}</a>
		} else if (orderStatus === 'success' || orderStatus === 'capture') {
			var status = <a style={{ marginBottom: 50 + 'px', color: 'white' }} className='btn btn-success btn-md'>{this.lang.payment_success}</a>
		} else if (orderStatus === 'deny' || orderStatus === 'failed') {
			var status = <a style={{ marginBottom: 50 + 'px', color: 'white' }} className='btn btn-danger btn-md'>{this.lang.payment_failed}</a>
		} else if (orderStatus === 'expire') {
			return <a style={{ marginBottom: 50 + 'px', color: 'white' }} className='btn btn-danger btn-md'>{this.lang.payment_expired}</a>
		} else if (orderStatus === 'refund') {
			var status = <a style={{ marginBottom: 50 + 'px', color: 'white' }} className='btn btn-success btn-md'>{this.lang.refund_success}</a>
		}
		return status
	}


	buttonStatus(res) {
		var orderStatus = res.data.result.detail.order_status
		const { open } = this.state;
		if (orderStatus === '0') {
			return (
				<div className='clearfix'>
					<a style={{ color: 'white' }} className='btn btn-info btn-sm border-0 mr-2'>{this.lang.cancel_order}</a>
					<a style={{ color: 'white' }} className='btn btn-warning btn-sm' onClick={(e) => this.showPaymentModal()}>{this.lang.pay_now}</a>
				</div>
			)
		} else if (orderStatus === 'pending') {
			return (
				<div className='clearfix'>
					<a style={{ color: 'white' }} className='btn btn-info btn-sm border-0 mr-2'>{this.lang.cancel_order}</a>
					<a style={{ color: 'white' }} className='btn btn-primary btn-sm' onClick={this.onOpenModal} >{this.lang.payment_instruction_btn}</a>
				</div>
			)
		} else if (orderStatus === 'success' || orderStatus === 'capture') {
			return (
				<div className='clearfix'>
					<a style={{ color: 'white' }} className='btn btn-info btn-sm border-0 mr-2'>{this.lang.cancel_order}</a>
					<a style={{ color: 'white' }} className='btn btn-success btn-sm' >{this.lang.myitinerary_btn}</a>
				</div>
			)
		} else if (orderStatus === 'deny' || orderStatus === 'failed') {
			return (
				<div className='clearfix'>
					<a style={{ color: 'white' }} className='btn btn-info btn-sm border-0 mr-2'>{this.lang.cancel_order}</a>
					<a style={{ color: 'white' }} className='btn btn-warning btn-sm' onClick={(e) => this.showPaymentModal()}>{this.lang.pay_now}</a>
				</div>
			)
		} else if (orderStatus === 'cancel' || orderStatus === 'expire') {
			return (
				<div className='clearfix'></div>
			)
		}
	}

	paymentTimer(res) {
		var dateOrder = this.state.detail.date_order //limit of transasction but not have parameter yet
		var orderStatus = res.data.result.detail.order_status
		if (orderStatus === "pending") {
			return (
				<div className='text-center'>
					<h5>{this.lang.payment_expiration}</h5>
					<h1>
						<Timer date={dateOrder} />
						{/* {console.log(this.timerPaymentExpiration(dateOrder))} */}
					</h1>
				</div>
			)
		} else if (orderStatus === "0") {
			this.showPaymentModal()
		}
	}

	timerPaymentExpiration(date) {
		var orderDate = new Date(date)
		var dateExpired = orderDate.getDate() + 1
		var monthExpired = orderDate.getMonth() + 1
		var countDown = orderDate.getFullYear() + '-' + monthExpired + '-' + dateExpired + 'T' + orderDate.getHours() + ':' + orderDate.getMinutes()
		return countDown
	}

	showPaymentModal() {
		return snap.pay(this.state.snapToken)
	}

	productList(res) {
		let data_map = res.data.result.item.map((product, i) => {
			const subpackage = product.data.subpackage
			let subpackageData;
			if (subpackage) {
				subpackageData = <small className='text-danger'>Paket Pilihan: {subpackage.name}</small>
			}
			return (
				<div className='media mb-3' key={i}>
					<div className='media-img'>
						<img className='mr-3' src={process.env.REACT_APP_CDN_PRODUCT + product.data.image} alt={product.data.name} />
					</div>
					<div className='media-body'>
						<div className='row'>
							<div className='col-md-8'>
								<h5 className='mt-0'>{product.data.name}</h5>
								{subpackageData}
								<p>
									{this.lang.date_deparature + ' : ' + this.formatDate(product.date_deparature)} <br />
									{this.lang.total_pax + ' : ' + product.qty}
								</p>
							</div>
							<div className='col-md-4'>
								<h5>
									{
										new Intl.NumberFormat(this.lang.code, {
											style: 'currency',
											currency: this.lang.currency,
											minimumFractionDigits: 0,
											maximumFractionDigits: 0
										}).format(this.state.basePrice)
									}
								</h5>
							</div>
						</div>
					</div>
				</div>
			)
		})
		return data_map
	}

	formatDate(date) {
		let monthNames;
		if (this.lang.code === 'id') {
			monthNames = [
				"Januari", "Feburari", "Maret",
				"April", "Mei", "Juni", "Juli",
				"Agustus", "September", "Oktober",
				"November", "Desember"
			];
		} else {
			monthNames = [
				"January", "February", "March",
				"April", "May", "June", "July",
				"August", "September", "October",
				"November", "December"
			];
		}

		var getDate = new Date(date)
		var day = getDate.getDate()
		var monthIndex = getDate.getMonth()
		var year = getDate.getFullYear()
		return day + ' ' + monthNames[monthIndex] + ' ' + year
	}

	orderDetail() {
		var status = this.state.detail.order_status

		if (this.state.payment) {
			var paymentType = this.state.payment.payment_type
		}

		if (status === "pending" && paymentType === "bank_transfer") {
			return (
				<div>
					<h5>{this.lang.order_detail}</h5>
					<hr />
					<div className='detail-payment'>
						<h6>{this.lang.order_number} :</h6>
						<strong className="text-danger" >{this.state.detail.payment_number}</strong>
						<br></br>
						<h6>{this.lang.total_amount}</h6>
						<strong >
							{
								new Intl.NumberFormat(this.lang.code, {
									style: 'currency',
									currency: this.lang.currency,
									minimumFractionDigits: 0,
									maximumFractionDigits: 0
								}).format(this.state.detail.total_due)
							}
						</strong>
						<br></br>
						<h6>{this.lang.discount} : </h6>
						<strong >{this.state.detail.discount}</strong>
						<br></br>
						<h6>{this.lang.bank_destination}</h6>
						<strong >
							{this.state.payment.va_numbers[0].bank.toUpperCase()}
						</strong>
						<br></br>
						<h6>{this.lang.virtual_account}:</h6>
						<strong >{this.state.payment.va_numbers[0].va_number}</strong>
						<br></br>
						<CopyToClipboard onCopy={this.onCopy} text={this.state.payment.va_numbers[0].va_number}>
							<a className="context-menu text-muted">
								<span className="glyphicon context-menu"></span>copy
							</a>
						</CopyToClipboard>
						<br></br>
						<h6>{this.lang.total_amount}</h6>
						<strong >
							{
								new Intl.NumberFormat(this.lang.code, {
									style: 'currency',
									currency: this.lang.currency,
									minimumFractionDigits: 0,
									maximumFractionDigits: 0
								}).format(this.state.detail.total_due)
							}
						</strong>
					</div>
				</div>
			)
		}
	}

	render() {
		const { open } = this.state;
		return (
			<div>
				<Loading
					show={this.state.loader}
					color="red"
				/>
				<div className='user-payment'>
					<div className='container'>
						<div className='row justify-content-center'>
							<div className='col-md-10'>
								<div className='card border-0 shadow mt-4 mb-4 bg-white'>
									<div className='card-header bg-white'>
										<div className='row'>
											<div className='col-md-7'>
												<h5>{this.lang.order_number + ' : '} {this.state.detail.payment_number}</h5>
												<p>{this.lang.date_order + ' : '} {this.formatDate(this.state.detail.date_order)}</p>
											</div>
											<div className='col-md-5'>
												<div className='clearfix'>
													<h6 className='float-left'>{this.lang.total_amount + ' : '} </h6>
													<h5 className='float-right'>
														{
															new Intl.NumberFormat(this.lang.code, {
																style: 'currency',
																currency: this.lang.currency,
																minimumFractionDigits: 0,
																maximumFractionDigits: 0
															}).format(this.state.detail.total_due)
														}
													</h5>
												</div>

												<a id='pay-button' data-sandbox={this.state.snapToken} disabled></a>
												{this.state.buttonStatus}

											</div>
										</div>
									</div>
									<div className='card-body'>
										<div className='row justify-content-center'>
											<div className='col-md-8 pt-5 pb-5'>
												<div className='text-center'>
													<h5>{this.lang.payment_status}</h5>
													{this.state.orderStatus}
												</div>
												{this.state.paymentCountDown}
											</div>
										</div>

										<div className='row  justify-content-center '>
											<div className='col-md-10 '>
												{this.orderDetail()}
											</div>
										</div>

										<Modal open={open} onClose={this.onCloseModal} little>
											<div className="row  justify-content-center">
												<div id="accordion">
													<div className="collapse-payment">
														<div id="collapseOne" className=" collapse show" aria-labelledby="headingOne" data-parent="#accordion">
															<h3>Intruksi Pembayaran</h3>
															<hr />
															<div className="card-body row">

																<span className="col">
																	<div className="image-payment"><img src="https://s2.bukalapak.com/images/confirmation_page/atm-1.png"></img></div>
																	<p>{this.lang.payment_instruction_bank_1}</p>
																</span>

																<span className="col">
																	<div className="image-payment"><img src="https://s1.bukalapak.com/images/confirmation_page/atm-3.png"></img></div>
																	<p>{this.lang.payment_instruction_bank_2}</p>
																</span>

																<span className="col">
																	<div className="image-payment"><img src="https://s1.bukalapak.com/images/confirmation_page/atm-4.png"></img></div>
																	<p>{this.lang.payment_instruction_bank_3}</p>
																</span>

																<span className="col">
																	<div className="image-payment"><img src="https://s3.bukalapak.com/images/confirmation_page/atm-2.png"></img></div>
																	<p>{this.lang.payment_instruction_bank_4}</p>
																</span>

															</div>
														</div>
													</div>

												</div>
											</div>
										</Modal>


										<div className='row justify-content-center'>
											<div className='col-md-10 '>
												<h5>{this.lang.order_summary}</h5>
												<hr />
												<br />
												{this.state.product}
											</div>
										</div>
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


export default CPayment
