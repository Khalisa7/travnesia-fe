import React, {Component} from 'react'
import './style/sMobilePayment.css'
import AuthService from '../../../_services/customers/AuthService';
import PaymentService from '../../../_services/payment/PaymentService';
import Translations from '../../../localization/translations';
import LocalizedStrings from 'react-localization';
import Currency from 'react-currency-formatter'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import Timer from '../../Components/Public/cTimer';
// import ContentLoader from '../../ContentLoader/MobileView/MobilePayment'
const snap = window.snap

class MPayment extends Component{

    constructor(props){
        super(props)
        this.state = {
            payment : '',
            detail:'',
            snapToken: '',
            product: [],
            orderStatus: '',
            paymentCountdown: null,
            paymentButton: '',
            buttonStatus: '',
            snapPay: null,
            copied : false,
            virtualAccount : '891097738557301',
            open: false,
            // content: <ContentLoader/>
        }
        this.Auth = new AuthService()
        this.Payment = new PaymentService()
        this.payButton = React.createRef()
        this.showPaymentModal = this.showPaymentModal.bind(this)

        // transalations
        this.Transalation = new Translations()
        var Locale = this.Transalation.locale()
        this.lang = new LocalizedStrings({Locale})
    }

    onCopy = () => {
        this.setState({copied : true})
    }

    onOpenModal = () => {
        this.setState({open: true})
    }

    onCloseModal = () => {
        this.setState({open:false})
    }

    componentWillMount(){
        let getUrl = (new URL(document.location)).searchParams
        let orderId = getUrl.get("order_id")
        this.Payment.paymentStatus(orderId)
        .then(res => {
            this.setState({payment:res.data.result.payment})
            this.setState({detail:res.data.result.detail})
            this.setState({snapToken:res.data.result.token})
            this.setState({orderStatus:this.orderStatus(res)})
            this.setState({paymentCountdown:this.paymentTimer(res)})
            this.setState({product: this.productList(res)})
            this.setState({buttonStatus: this.buttonStatus(res)})
            // setTimeout(() => this.setState({content:this.content()}), 1500)
        })
        .catch(err =>{
            return window.location = '/'
        })
    }

    orderStatus(res){
        var orderStatus = res.data.result.detail.order_status
		if (orderStatus === '0') {
			var status = <a style={{color: 'white'}} className='btn btn-danger btn-md'>{this.lang.payment_unpaid}</a>
		}else if (orderStatus === 'pending') {
			var status = <a style={{color: 'white'}} className='btn btn-warning btn-md'>{this.lang.waiting_payment}</a>
		}else if (orderStatus === 'success' || orderStatus === 'capture') {
			var status = <a style={{ color: 'white'}} className='btn btn-success btn-md'>{this.lang.payment_success}</a>
		}else if (orderStatus === 'deny' || orderStatus === 'failed') {
			var status = <a style={{color: 'white'}} className='btn btn-danger btn-md'>{this.lang.payment_failed}</a>
		}else if (orderStatus === 'expire') {
			return <a style={{color: 'white'}} className='btn btn-danger btn-md'>{this.lang.payment_expired}</a>
		}else if (orderStatus === 'refund') {
			var status = <a style={{color: 'white'}} className='btn btn-success btn-md'>{this.lang.refund_success}</a>
		}
		return status
    }

    buttonStatus(res){
        var orderStatus = res.data.result.detail.order_status
        const {open} =this.state
		if (orderStatus === '0') {
			return (
				<div className='clearfix'>
					<a style={{color: 'white'}} className='btn btn-info btn-sm border-0 mr-2'>{this.lang.cancel_order}</a>
					<a style={{color: 'white'}} className='btn btn-warning btn-sm' onClick={(e)=>this.showPaymentModal()}>{this.lang.pay_now}</a>
				</div>
			)
		}else if (orderStatus === 'pending') {
			return (
				<div className='clearfix'>
					<a style={{color: 'white'}} className='btn btn-info btn-sm border-0 mr-2'>{this.lang.cancel_order}</a>
					<a style={{color: 'white'}} className='btn btn-primary btn-sm'onClick={this.onOpenModal} >{this.lang.payment_instruction_btn}</a>
				</div>
			)
		}else if (orderStatus === 'success' || orderStatus === 'capture') {
			return (
				<div className='clearfix'>
					<a style={{color: 'white'}} className='btn btn-info btn-sm border-0 mr-2'>{this.lang.cancel_order}</a>
					<a style={{color: 'white'}} className='btn btn-success btn-sm' >{this.lang.myitinerary_btn}</a>
				</div>
			)
		}else if (orderStatus === 'deny' || orderStatus === 'failed') {
			return (
				<div className='clearfix'>
					<a style={{color: 'white'}} className='btn btn-info btn-sm border-0 mr-2'>{this.lang.cancel_order}</a>
					<a style={{color: 'white'}} className='btn btn-warning btn-sm' onClick={(e)=>this.showPaymentModal()}>{this.lang.pay_now}</a>
				</div>
			)
		}else if (orderStatus === 'cancel' || orderStatus === 'expire') {
			return (
				<div className='clearfix'></div>
			)
		}
    }

    paymentTimer(res){
        var dateOrder = res.data.result.detail.date_order
        var orderStatus = res.data.result.detail.order_status
        if(orderStatus === 1){
            return(
                <div className='text-center'>
                    <h5>{this.lang.payment_expiration}</h5>
                    <h1>
                        <Timer date={this.timerPaymentExpiration(dateOrder)}/>
                    </h1>
                </div>
            )
        }else if(orderStatus === 0){
            this.showPaymentModal()
        }
    }

    timerPaymentExpiration(date){
        var orderDate = new Date(date)
        var dateExpired = orderDate.getDate() + 1
        var monthExpired = orderDate.getMonth() + 1
        var countDown = orderDate.getFullYear + '-' + monthExpired + '-' + dateExpired + 'T' + orderDate.getHours() + ':' +orderDate.getMinutes()
        return countDown
    }

    showPaymentModal(){
        return snap.pay(this.state.snapToken)
    }

    productList(res){
        let data_map = res.data.result.item.map((product, i) => {
            return(
                <div className="col-md-12 px-0" key={i}>
                    <div className="card mb-3">
                        <div className="row no-gutters">
                            <div className="col-4">
                                <img src={process.env.REACT_APP_CDN_PRODUCT + product.data.image} style={{ objectFit: "cover", height: 100 + "%", width: 100 + "%" }} alt="" />
                            </div>
                            <div className="col-8">
                                <div className="card-body" align="left">
                                    <h6 className="card-title"><b>{product.data.name}</b></h6>
                                    <p>
                                        {this.lang.date_deparature + ' : ' } <br />
                                        <i>{this.formatDate(product.date_deparature)}</i> <br />
                                        {this.lang.total_pax + ' : ' + product.qty}
                                    </p>
                                    <h5>
                                        {
                                            new Intl.NumberFormat(this.lang.code, {
                                                style: 'currency',
                                                currency: this.lang.currency,
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0
                                            }).format(product.data.base_price)
                                        }
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        return data_map
    }

    formatDate(date){
        var monthNames = [
            "January", "February", "March",
		    "April", "May", "June", "July",
		    "August", "September", "October",
		    "November", "December"
        ]
        var getDate = new Date(date)
        var day = getDate.getDate()
        var monthIndex = getDate.getMonth()
        var year = getDate.getFullYear()
        return day + ' ' + monthNames[monthIndex] + ' ' + year
    }
    
    render(){
        const { open } = this.state;
        return(
            <div className='mobile-payment'>
                <div className='text-center mb-3'>
                    <span className='h6 w-60 mx-auto px-5 py-2 rounded-bottom fourth-color text-white shadow-sm span-destination' style={{position:'sticky'}}>Payment</span>
                </div>
                <div className='container'>
                    <div className='text-center'>
                        <div className='clearfix'>
                            <span>{this.lang.total_amount + ' : '}</span>
                            <h3>
                                <Currency
                                quantity={parseFloat(this.state.payment.gross_amount)}
                                currency={this.lang.currency}
                                decimal=","
                                group="."/>
                            </h3>
                        </div>
                        <h5>{this.lang.payment_status}</h5>
                        {this.state.orderStatus}
                        <h6 className='mt-2'>{this.lang.order_number + ' : '}</h6> <h6 style={{color:"#dc3545"}}>{this.state.payment.payment_number}</h6>
                        <p>{this.lang.date_order + ' : '} {this.formatDate(this.state.detail.date_order)}</p>
                        
                    </div>
                    
                    <div className='text-center'>
                        <h6 className='border-bottom mt-3'>Order Detail</h6>
                        <div className='row'>
                            <div className='col-6'>
                                <p>Discount: <strong>0%</strong></p>
                            </div>
                            <div className='col-6'>
                                <p>Pajak Pembelian : <strong>5%</strong></p>
                            </div>
                        </div>
                        <span>Virtual Account :</span>
                        <br/>
                        <span style={{color: '#dc3545'}}>
                            {this.state.virtualAccount} 
                        </span>
                        <br/>
                        <CopyToClipboard onCopy={this.onCopy} text={this.state.virtualAccount}>
                            <a className="context-menu text-muted">
                                <span className="glyphicon context-menu"></span>Copy
                            </a>
                        </CopyToClipboard>
                        
                        <h6 className='border-bottom mt-3'>{this.lang.order_summary}</h6>
                        {this.state.product}
                        {this.state.buttonStatus}
                    </div>
                </div>
            </div>
        )
    }

    // render(){
    //     return(
    //         <div className='mobile-payment'>
    //             {this.state.content}
    //         </div>
    //     )
    // }
}
export default MPayment