import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './style/sCheckout.css'
import Select from 'react-select'
import AuthService from '../../../_services/customers/AuthService'
import CheckoutService from '../../../_services/checkout/CheckoutService'
import Translations from '../../../localization/translations.js'
import LocalizedStrings from 'react-localization'
import countrymap from './../../../_services/json_data/country-list.json'
import ContentLoader from './../../ContentLoader/DesktopView/CheckoutLoader'
import { confirmAlert } from 'react-confirm-alert'
import Alert from '../../../_services/alert/Alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import PaymentService from '../../../_services/payment/PaymentService'
import Toggle from "react-toggle-component"
import "react-toggle-component/styles.css"
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'

const snap = window.snap

class CCheckout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // Store From Fetch Data
            userData: [],
            cartData: [],

            // Temporary Value
            listAllCountry: [],
            listAllRegion: [],

            //Form Validation
            fields: {},
            errors: {},
            invalid: '',

            // DATA FORM
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            address: '',
            country: [],    // Negara
            region: [],     // Provinsi
            city: '',       // Kota
            zipCode: '',    // Kode Pos
            token: '',
            customerDataToggle: false,
            isProvinceDisable: true,
            subpackage: '',
            basePrice: 0,
            totalPrice: 0,

            // MIDTRANS
            snapToken: null,

            //ContentLoader
            content: <ContentLoader />,
            showContent: 'd-none',
            loader: true,
            orderProcess: false

        }

        // BACKEND
        this.Payment = new PaymentService()
        this.Auth = new AuthService()
        this.Checkout = new CheckoutService()
        this.Alert = new Alert()

        // ALERT, LANGUAGE, LOCAL
        this.Translations = new Translations()
        var Locale = this.Translations.locale()
        this.lang = new LocalizedStrings({ Locale })

        // BIND FUNCTION
        // this.fetchDataUser = this.fetchDataUser.bind(this)
        this.getAllCountry = this.getAllCountry.bind(this)
        this.countryCode = this.countryCode.bind(this)

        this.handleCountrySelect = this.handleCountrySelect.bind(this)
        this.handleRegionSelect = this.handleRegionSelect.bind(this)

        this.renderDestination = this.renderDestination.bind(this)
        this.renderUserForm = this.renderUserForm.bind(this)

        // MIDTRANS BIND
        this.showPaymentModal = this.showPaymentModal.bind(this)
        this.orderConfirmation = this.orderConfirmation.bind(this)
        this.payButton = this.payButton.bind(this)

    }

    componentDidMount() {
        const token = new URLSearchParams(this.props.match.params);
        this.Checkout.customerData(token)
            .then(res => {

                let cartData = res.result.cart.map(data => {
                    document.title = "Checkout " + data.product_details.name + " - " + process.env.REACT_APP__NAME
                    return data
                })

                this.setState({ userData: res.result.customer })
                this.setState({ cartData: cartData })
                this.setState({
                    firstName: this.state.userData.first_name,
                    lastName: this.state.userData.last_name,
                    phoneNumber: this.state.userData.phone,
                    email: this.state.userData.username,
                    address: this.state.userData.address,
                    zipCode: this.state.userData.postal_code,
                })

                const customerCountry = [{ value: this.state.userData.country, label: this.countryCode() }]
                const customerCity = this.state.userData.city
                const customerProvince = [{ value: this.state.userData.province, label: this.state.userData.province }]

                this.setState({ token: token })
                // this.setState({ country: customerCountry })
                // this.setState({ region: customerProvince })
                this.setState({ city: customerCity })
                this.setState({ content: '' })
                this.setState({ showContent: '' })
                this.setState({ loader: false })

                if (!this.state.userData.province || !this.state.userData.country) {
                    this.setState({ region: '' })
                    this.setState({ country: '' })
                } else {
                    this.setState({ region: customerProvince })
                    this.setState({ country: customerCountry })
                }

                this.state.cartData.map((data, i) => {
                    if (data.subpackage) {
                        const getPrice = data.subpackage.base_price
                        const getQty = data.qty
                        const calculate = getPrice * getQty
                        this.setState({ basePrice: data.subpackage.base_price })
                        this.setState({ totalPrice: calculate })
                    } else {
                        const getPrice = data.product_details.price
                        const getQty = data.qty
                        const calculate = getPrice * getQty
                        this.setState({ basePrice: data.product_details.price })
                        this.setState({ totalPrice: calculate })

                    }
                })

            })
            .catch(err => {
                this.error()
            })

        this.getAllCountry()
    }

    error() {
        return confirmAlert({
            title: 'Opsss...',
            message: 'No item in cart. Shop now ?',
            buttons: [
                {
                    label: 'Okay',
                    onClick: () => {
                        window.location = '/travel'
                    },
                }
            ]
        })
    }

    getToken() {
        var getSegment = window.location.href;
        var lastSegment = getSegment.substr(getSegment.lastIndexOf('/') + 1)
        return lastSegment
    }

    countryCode() {
        for (var i = 0; i < countrymap.length; i++) {
            var populate = countrymap[i]
            if (populate.value === this.state.userData.country) {
                return populate.label
            }
        }
    }

    getAllCountry() {
        var countryData = []
        for (var i = 0; i < countrymap.length; i++) {
            var obj = countrymap[i]
            const dataMap = { value: obj.value, label: obj.label }
            countryData.push(dataMap)
        }
        this.setState({ listAllCountry: countryData })
    }

    setProvince(dataSelectedCountry) {
        var regionData = []
        var selectedCountry = []

        if (!dataSelectedCountry) {
            selectedCountry.push(this.state.userData.country)
        } else {
            selectedCountry.push(dataSelectedCountry['value'])
        }

        for (var i = 0; i < countrymap.length; i++) {
            var populate = countrymap[i]
            if (populate.value == selectedCountry) {

                var province = populate.regions
            }
        }

        for (var i = 0; i < province.length; i++) {
            var obj = province[i]
            const dataMap = { value: obj.shortCode, label: obj.name }
            regionData.push(dataMap)
        }

        this.setState({ listAllRegion: regionData })
    }


    handleCountrySelect = (selectedOptions) => {
        this.setState({ isProvinceDisable: false })
        this.setState({ country: selectedOptions })
        this.setState({ region: '' })
        this.setProvince(selectedOptions)
    }

    handleRegionSelect = (selectedOptions) => {
        this.setState({ region: selectedOptions })
    }

    showPaymentModal(res) {
        var orderNumber = res.data.result.code
        this.Payment.paymentStatus(orderNumber)
            .then(res => {
                this.setState({ snapToken: res.data.result.token })
                snap.pay(this.state.snapToken, {
                    onClose: function () {
                        return window.location = '/payment/product?order_id=' + orderNumber
                    }
                })
            })
            .catch(err => {
                this.Alert.warning('Oppss...', 'Gagal memproses permintaan anda')
            })
    }

    orderConfirmation(body) {
        // get token in URL
        const token = this.getToken()

        // show confirmation alert
        return confirmAlert({
            title: this.lang.pay_confirm_title,
            message: this.lang.pay_confirm_message,
            buttons: [
                {
                    label: this.lang.yes,
                    onClick: () => {
                        try {
                            this.setState({ loader: true })
                            this.Checkout.createOrder(body, token)
                                .then(res => {
                                    this.showPaymentModal(res)
                                    this.setState({ loader: false })
                                })
                                .catch(err => {
                                    this.Alert.warning('Oppss...', 'Gagal memproses permintaan anda')
                                    this.setState({ loader: false })
                                })
                        }
                        catch (err) {
                            this.Alert.warning('Oppss...', 'Gagal memproses permintaan anda')
                            this.setState({ loader: false })
                        }
                    }
                },
                {
                    label: this.lang.cancel
                }
            ]
        })
    }

    payButton(event) {
        // to receive event data
        event.preventDefault()

        if (this.handleValidation()) { // Check field validation
            let fields = this.state.fields // define field state

            //Save data payload
            var body = {
                customer_firstname: fields['first_name'],
                customer_lastname: fields['last_name'],
                customer_address: fields['address'],
                customer_city: fields['city'],
                customer_province: this.state.region['label'],
                customer_country: this.state.country.value,
                postal_code: fields['postal_code'],
                customer_phone: fields['phone_number'],
                customer_email: fields['email'],
            }

            //Show confirmation alert
            this.orderConfirmation(body)
        }
    }

    handleValidation() {
        let fields = this.state.fields
        let errors = {}
        let invalid = {}
        let isValid = true

        //Check First Name field
        if (!fields['first_name']) {
            isValid = false
            invalid['first_name'] = 'is-invalid'
            errors['first_name'] = "Nama Awal tidak boleh kosong"
        }

        if (!fields['last_name']) {
            isValid = false
            invalid['last_name'] = 'is-invalid'
            errors['last_name'] = "Nama Akhir tidak boleh kosong"
        }

        if (!fields['phone_number']) {
            isValid = false
            invalid['phone_number'] = 'is-invalid'
            errors['phone_number'] = "Nomor Telepon tidak boleh kosong"
        }

        if (!fields['email']) {
            isValid = false
            invalid['email'] = 'is-invalid'
            errors['email'] = "Email tidak boleh kosong"
        }

        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                isValid = false;
                invalid['email'] = 'is-invalid'
                errors["email"] = "Alamat Email tidak benar";
            }
        }

        if (!fields['address']) {
            isValid = false
            invalid['address'] = 'is-invalid'
            errors['address'] = "Alamat tidak boleh kosong"
        }

        if (!this.state.country) {
            isValid = false
            invalid['country'] = 'is-invalid'
            errors['country'] = "Negara tidak boleh kosong"
        }

        if (!this.state.region) {
            isValid = false
            invalid['province'] = 'is-invalid'
            errors['province'] = "Provinsi tidak boleh kosong"
        }


        if (!fields['city']) {
            isValid = false
            invalid['city'] = 'is-invalid'
            errors['city'] = "Kota/Kabupaten tidak boleh kosong"
        }

        if (!fields['postal_code']) {
            isValid = false
            invalid['postal_code'] = 'is-invalid'
            errors['postal_code'] = "Kode POS tidak boleh kosong"
        }

        this.setState({ errors: errors });
        this.setState({ invalid: invalid })
        return isValid;
    }

    handleChange(field, e) {
        let fields = this.state.fields
        fields[field] = e.target.value
        this.setState({ fields })
        this.setState({ isProvinceDisable: false })
        this.setState({ invalid: { field: ' ' } })
    }

    setCustomerData() {
        let fields = this.state.fields
        if (!this.state.customerDataToggle) {
            this.setState({
                fields: {
                    'first_name': this.state.firstName,
                    'phone_number': this.state.phoneNumber,
                    'last_name': this.state.lastName,
                    'email': this.state.email,
                    'address': this.state.address,
                    'city': this.state.city,
                    'postal_code': this.state.zipCode
                }
            })
            this.setState({ country: { value: this.state.userData.country, label: this.countryCode() } })
            this.setState({ region: this.state.userData.province })
            this.setState({ isProvinceDisable: false })
            this.setState({ customerDataToggle: true })
        } else {
            this.setState({
                fields: {
                    'first_name': '',
                    'phone_number': '',
                    'last_name': '',
                    'email': '',
                    'address': '',
                    'city': '',
                    'postal_code': '',
                }
            })
            this.setState({ country: this.lang.choose_country })
            this.setState({ province: this.lang.choose_province })
            this.setState({ isProvinceDisable: true })
            this.setState({ customerDataToggle: false })
        }

    }

    renderDestination() {
        return (
            <div className='card border-0 shadow bg-white rounded mb-4 render-destination'>
                <span className='h6 w-60 mx-auto px-5 py-2 rounded-bottom fourth-color text-white shadow-sm span-destination'>{this.lang.order_summary}</span>
                {this.state.cartData.map((data, i) => {

                    const subpackage = data.subpackage
                    let subpackageData;
                    if (subpackage) {
                        subpackageData = <small className='text-danger'>Paket Pilihan: {data.subpackage.name}</small>
                    }

                    return (
                        <div className='col-md-12 mt-2' key={i}>
                            {/* <div className='media mb-2'>
                                <div className='media-img'>
                                    <img className='mr-3' src={process.env.REACT_APP_CDN_PRODUCT + data.product_details.image} alt={data.product_details.name} style={{ width: '140px' }} />
                                </div>
                                <div className='media-body'>
                                    <div className='row'>
                                        <div className='col-md-8'>
                                            <a href={process.env.PUBLIC_URL + data.product_details.slug}><h6 className='mt-0'>{data.product_details.name}</h6></a>
                                            {subpackageData}
                                            <p>
                                                Tanggal Berangkat : {new Intl.DateTimeFormat(this.lang.code, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: '2-digit'
                                                }).format(new Date(data.date_deparature))}
                                                <br />
                                                Jumlah : {data.qty} pax<br />
                                            </p>
                                        </div>
                                        <div className='col-md-4'>
                                            <h5>
                                                {new Intl.NumberFormat(this.lang.code, {
                                                    style: 'currency',
                                                    currency: this.lang.currency,
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0
                                                }).format(this.state.basePrice)}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="card mb-3">
                                <div className="row no-gutters">
                                    <div className="col-md-4">
                                        <img src={process.env.REACT_APP_CDN_PRODUCT + data.product_details.image} className="card-img" alt="..." style={{ height: 100 + "%", objectFit: "cover" }} />
                                    </div>
                                    <div className='col-md-8'>
                                        <div className="card-body">
                                            <a href={process.env.PUBLIC_URL + data.product_details.slug}><h6 className='mt-0'>{data.product_details.name}</h6></a>
                                            {subpackageData}
                                            <p>
                                                Tanggal Berangkat : {new Intl.DateTimeFormat(this.lang.code, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: '2-digit'
                                                }).format(new Date(data.date_deparature))}
                                                <br />
                                                Jumlah : {data.qty} pax<br />
                                            </p>
                                            <h5>
                                                {new Intl.NumberFormat(this.lang.code, {
                                                    style: 'currency',
                                                    currency: this.lang.currency,
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0
                                                }).format(this.state.basePrice)}
                                            </h5>
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

    // FORM USER
    renderUserForm() {
        return (
            <div>
                <div className='card select-country border-0 shadow bg-white rounded mb-4'>
                    <Toggle name="toggle-5"
                        style={{ margin: 20 }}
                        checked={this.state.customerDataToggle}
                        labelRight="Gunakan data profil saya sebagai Data Pemesan"
                        onToggle={value => { this.setCustomerData() }}
                    />
                </div>
                <div className='card select-country border-0 shadow bg-white rounded mb-4'>

                    <span className='h6 w-60 mx-auto px-5 py-2 rounded-bottom fourth-color text-white shadow-sm'>{this.lang.personal_information}</span>
                    <div className='card-body rounded-0'>
                        <div className='form-row'>
                            <div className='form-group col-md-6'>
                                <label htmlFor=''>{this.lang.first_name}</label>
                                <div className='input-group'>
                                    <div className='input-group-prepend'>
                                        <span className='input-group-text primary-color'>
                                            <i className='fa fa-fw fa-user f-white' />
                                        </span>
                                    </div>
                                    <input
                                        type='text'
                                        className={'form-control ' + this.state.invalid["first_name"]}
                                        name="first_name"
                                        onChange={this.handleChange.bind(this, 'first_name')}
                                        defaultValue={this.state.fields["first_name"]}
                                    />
                                </div>
                                <small className="text-danger">{this.state.errors["first_name"]}</small>
                            </div>
                            <div className='form-group col-md-6'>
                                <label htmlFor=''>{this.lang.last_name}</label>
                                <div className='input-group'>
                                    <div className='input-group-prepend'>
                                        <span className='input-group-text primary-color'>
                                            <i className='fa fa-fw fa-user f-white' />
                                        </span>
                                    </div>
                                    <input
                                        type='text'
                                        className={'form-control ' + this.state.invalid["last_name"]}
                                        name="last_name"
                                        onChange={this.handleChange.bind(this, 'last_name')}
                                        defaultValue={this.state.fields["last_name"]}
                                    />
                                </div>
                                <small className="text-danger">{this.state.errors["last_name"]}</small>
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='form-group col-md-6'>
                                <label htmlFor=''>{this.lang.phone_number}</label>
                                <div className='input-group'>
                                    <div className='input-group-prepend'>
                                        <span className='input-group-text primary-color'>
                                            <i className='fa fa-fw fa-phone f-white' />
                                        </span>
                                    </div>
                                    <input
                                        type='number'
                                        className={'form-control ' + this.state.invalid["phone_number"]}
                                        name="phone_number"
                                        onChange={this.handleChange.bind(this, 'phone_number')}
                                        defaultValue={this.state.fields["phone_number"]}
                                    />
                                </div>
                                <small className="text-danger">{this.state.errors["phone_number"]}</small>
                            </div>
                            <div className='form-group col-md-6'>
                                <label htmlFor=''>{this.lang.email}</label>
                                <div className='input-group'>
                                    <div className='input-group-prepend'>
                                        <span className='input-group-text primary-color'>
                                            <i className='fa fa-fw fa-envelope-o f-white' />
                                        </span>
                                    </div>
                                    <input
                                        type='email'
                                        className={'form-control ' + this.state.invalid["email"]}
                                        name="email"
                                        onChange={this.handleChange.bind(this, 'email')}
                                        defaultValue={this.state.fields["email"]}
                                    />
                                </div>
                                <small className="text-danger">{this.state.errors["email"]}</small>
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='form-group col-md-12'>
                                <label htmlFor=''>{this.lang.address}</label>
                                <textarea
                                    cols='30'
                                    rows='5'
                                    className={'form-control ' + this.state.invalid["address"]}
                                    name="address"
                                    onChange={this.handleChange.bind(this, 'address')}
                                    value={this.state.fields["address"]}
                                />
                                <small className="text-danger">{this.state.errors["address"]}</small>
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='form-group col-md-6'>
                                <label htmlFor=''>{this.lang.country}</label>
                                <Select
                                    options={this.state.listAllCountry}
                                    value={this.state.country}
                                    placeholder={this.lang.choose_country}
                                    name="country"
                                    onChange={this.handleCountrySelect}
                                />
                                <small className="text-danger">{this.state.errors["country"]}</small>
                            </div>
                            <div className='form-group col-md-6'>
                                <label htmlFor=''>{this.lang.province}</label>
                                <Select
                                    options={this.state.listAllRegion}
                                    value={this.state.region}
                                    placeholder={this.lang.choose_province}
                                    name="province"
                                    onChange={this.handleRegionSelect}
                                    isDisabled={this.state.isProvinceDisable}
                                />
                                <small className="text-danger">{this.state.errors["province"]}</small>
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='form-group col-md-6'>
                                <label htmlFor=''>{this.lang.city}</label>
                                <input
                                    type='text'
                                    className={'form-control ' + this.state.invalid["city"]}
                                    name="city"
                                    onChange={this.handleChange.bind(this, 'city')}
                                    defaultValue={this.state.fields["city"]}

                                />
                                <small className="text-danger">{this.state.errors["city"]}</small>
                            </div>
                            <div className='form-group col-md-6'>
                                <label htmlFor=''>{this.lang.postal_code}</label>
                                <div className='input-group'>
                                    <div className='input-group-prepend'>
                                        <span className='input-group-text primary-color'>
                                            <i className='fa fa-fw fa-map-marker f-white' />
                                        </span>
                                    </div>
                                    <input
                                        type='text'
                                        className={'form-control ' + this.state.invalid["postal_code"]}
                                        placeholder={this.lang.postal_code}
                                        name="postal_code"
                                        onChange={this.handleChange.bind(this, 'postal_code')}
                                        defaultValue={this.state.fields["postal_code"]}
                                    />
                                </div>
                                <small className="text-danger">{this.state.errors["postal_code"]}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    content() {
        return (
            <div className='container pt-4'>
                <div className='page-heading'>
                    <h5>Checkout</h5>
                    <hr />
                </div>
                <div className='row'>
                    <div className='col-md-8'>
                        {this.renderDestination()}
                        {this.renderUserForm()}
                    </div>
                    <div className='col-md-4 sticky pb-4'>
                        <div className='card bg-white shadow border-0'>
                            <div className='card-body'>
                                <span>
                                    <i className='fa fa-bookmark-o fa-fw f-primary-color' />
                                </span>
                                <h2>Total Pembayaran</h2>
                                <h4>
                                    {
                                        new Intl.NumberFormat(this.lang.code, {
                                            style: 'currency',
                                            currency: this.lang.currency,
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0
                                        }).format(this.state.totalPrice)
                                    }
                                </h4>
                                <br />
                                <div className='input-group'>
                                    <div className='col-xs-4'>
                                        <input style={{ float: 'left' }} type='text' className='form-control ' placeholder='Punya Kode Promo ? Masukan' />
                                    </div>
                                </div>
                                <div className='input-group'>
                                    <div className='col-xs-4'>
                                        <a className='btn btn-primary btn-block text-white'>
                                            Gunakan Kode Promo
                                        </a>
                                    </div>
                                </div><br /><hr />
                                <a className='btn btn-warning btn-block text-white' onClick={this.payButton} >
                                    {this.lang.pay}
                                </a>
                                <br />
                                <span className='d-block'><i className='fa fa-clock-o fa-fw' /> {this.lang.order_available}</span>
                                <span className='d-block'><i className='fa fa-money fa-fw' /> {this.lang.instant_confirmation}</span>
                                <hr />
                                <h6>Payment Method</h6>
                                <div className='bank_logo logo_bca' />
                                <div className='bank_logo logo_mandiri' />
                                <div className='bank_logo logo_cimb' />
                                <div className='bank_logo logo_alfamart' />
                                <div className='bank_logo logo_bni' />
                                <div className='bank_logo logo_link' />
                                <div className='bank_logo logo_visa' />
                                <div className='bank_logo logo_prima' />
                            </div>
                        </div>
                    </div>
                </div>
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
                <div className='checkout'>
                    {this.state.content}
                    <div className={'container pt-4 ' + this.state.showContent}>
                        <div className='page-heading'>
                            <h5>Checkout</h5>
                            <hr />
                        </div>
                        <div className='row'>
                            <div className='col-md-8'>
                                {this.renderDestination()}
                                {this.renderUserForm()}
                            </div>
                            <div className='col-md-4 sticky pb-4'>
                                <div className='card bg-white shadow border-0'>
                                    <div className='card-body'>
                                        <span>
                                            <i className='fa fa-bookmark-o fa-fw f-primary-color' />
                                        </span>
                                        <h2>Total Pembayaran</h2>
                                        <h4>
                                            {
                                                new Intl.NumberFormat(this.lang.code, {
                                                    style: 'currency',
                                                    currency: this.lang.currency,
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0
                                                }).format(this.state.totalPrice)
                                            }
                                        </h4>
                                        <br />
                                        <div className='input-group'>
                                            <div className='col-xs-4'>
                                                <input style={{ float: 'left' }} type='text' className='form-control ' placeholder='Punya Kode Promo ? Masukan' />
                                            </div>
                                        </div>
                                        <div className='input-group'>
                                            <div className='col-xs-4'>
                                                <a className='btn btn-primary btn-block text-white'>
                                                    Gunakan Kode Promo
                                            </a>
                                            </div>
                                        </div><br /><hr />
                                        <a className='btn btn-warning btn-block text-white' onClick={this.payButton} >
                                            {this.lang.pay}
                                        </a>
                                        <br />
                                        <span className='d-block'><i className='fa fa-clock-o fa-fw' /> {this.lang.order_available}</span>
                                        <span className='d-block'><i className='fa fa-money fa-fw' /> {this.lang.instant_confirmation}</span>
                                        <hr />
                                        <h6>Payment Method</h6>
                                        <div className='bank_logo logo_bca' />
                                        <div className='bank_logo logo_mandiri' />
                                        <div className='bank_logo logo_cimb' />
                                        <div className='bank_logo logo_alfamart' />
                                        <div className='bank_logo logo_bni' />
                                        <div className='bank_logo logo_link' />
                                        <div className='bank_logo logo_visa' />
                                        <div className='bank_logo logo_prima' />
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

export default withRouter(CCheckout)
