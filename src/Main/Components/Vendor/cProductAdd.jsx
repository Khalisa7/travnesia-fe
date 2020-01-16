import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react'
import './style/sProductAdd.css'
import { timingSafeEqual } from 'crypto';
import AuthService from './../../../_services/vendor/AuthService'
import Axios from 'axios'
import Alert from './../../../_services/alert/Alert'

class CProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {

            txt_title: "",
            txt_destination: "",
            txt_dayDuration: "",
            txt_nightDuration: "",
            txt_category: "",
            txt_shortdesc: "",
            txt_description: "",
            pickup_location:"",

            //itenerary in here
            //.....
            itenerary: [],

            facility_1: false,
            facility_2: false,
            facility_3: false,
            facility_4: false,
            facility_5: false,
            facility_6: false,
            facility_7: false,
            facility_8: false,

            guarantee_1: false,
            guarantee_2: false,
            guarantee_3: false,
            guarantee_4: false,

            txt_price: "",
            txt_stock: 0,
            txt_minimum_order: 0,
            txt_baseprice: 0,

            count_day: 0,
            count_night: 0,
            total_price: 0,

            category: [],
            destination: []
        }
        this.image_name = false
        this.itenerary = []

        this.AuthService = new AuthService()
        this.Alert = new Alert()
        this.createEditor = this.createEditor.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleEditorChange = this.handleEditorChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.getCategory()
        this.getDestination()
    }

    createEditor() {
        let editor = []
        for (var i = 0; i < this.state.count_day; i++) {
            editor.push(
                <div className={i === 0 ? "tab-pane fade show active" : "tab-pane fade"} id={"day" + (i + 1)} role="tabpanel" key={i}>
                    <Editor apiKey='14x3qtva4rbkrojckjy1k0kvozhlx9r06yyd56avyqq6vol7' onChange={
                        (event)=>{
                            this.itenerary[i -1] = event.target.getContent()
                            console.log(this.itenerary)
                        }
                    } />
                    <small className="form-text text-muted">Day {i + 1}</small>
                </div>
            )
        }
        return editor
    }

    createEditorNav() {
        let nav = []
        nav.push()
        for (var i = 0; i < this.state.count_day; i++) {
            nav.push(
                <li className="nav-item" key={i}>
                    <a className={i === 0 ? "nav-item nav-link active" : "nav-item nav-link"} data-toggle="tab" href={"#day" + (i + 1)} role="tab" aria-controls={"day-" + (i + 1)} aria-selected="true" key={i}>Day {i + 1}</a>
                </li>
            )
        }
        return nav
    }

    getCategory() {
        try {
            fetch(process.env.REACT_APP_ENDPOINT + 'vendor/travel/product/category',{
                headers:{
                    Authorization: 'Bearer ' + this.AuthService.getToken()
                }
            })
                .then(response => { return response.json() })
                .then((data) => {
                    // console.log(data.result)
                    this.setState({
                        category: data.result
                    })
                })
        } catch (error) {

        }
    }

    getDestination() {
        try {
            fetch(process.env.REACT_APP_ENDPOINT + 'vendor/travel/product/destination',{
                headers:{
                    Authorization: 'Bearer ' + this.AuthService.getToken()
                }
            })
                .then(response => { return response.json() })
                .then((data) => {
                    // console.log(data.result)
                    this.setState({
                        destination: data.result
                    })
                }).catch(error=>{
                    console.log(error)
                })
        } catch (error) {

        }
    }

    categoryList() {
        let category = []
        this.state.category.map((data, i) => {
            category.push(
                <option key={i} value={data.category_id}>{data.name}</option>
            )
        })
        return category
    }

    destinationList(){
        let destination = []
        this.state.destination.map((data, i) => {
            destination.push(
                <option key={i} value={data.destination_id}>{data.name}</option>
            )
        })
        return destination
    }

    handleChange(event, parameter) {
        this.setState({
            [parameter]: event.target.value
        })
        console.log(this.state)
    }

    handleEditorChange(event, parameter) {
        this.setState({
            [parameter]: event.target.getContent()
        })
        console.log("content was update:" + event.target.getContent())
    }

    handleImageUpload(){
        let imagefile = document.querySelector('#fileImage')
        let formData = new FormData()
        var finish = false
        formData.append("file", imagefile.files[0])
        Axios.post(process.env.REACT_APP_ENDPOINT + 'vendor/travel/product/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + this.AuthService.getToken()
            }
        }).then(resp => {
            this.image_name = resp.data.result.image_name
        }).catch(error=>{
            console.log(error)
            this.image_name = null
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        Axios({
            url: process.env.REACT_APP_ENDPOINT + 'vendor/travel/product',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.AuthService.getToken()
            },
            data: {
                "destination": this.state.txt_destination,
                "title": this.state.txt_title,
                "image": this.image_name,
                "category": this.state.txt_category,
                "id_shortdesc": this.state.txt_shortdesc,
                "id_desc": this.state.txt_description,
                "base_price": parseInt(this.state.total_price),
                "qty_minimum_booking": parseInt(this.state.txt_minimum_order),
                "day_duration": parseInt(this.state.count_day),
                "night_duration": parseInt(this.state.count_night),
                "stock": parseInt(this.state.txt_stock),
                "pickup_location": this.state.pickup_location,
                "open_date_start": "2019-3-12",
                "open_date_end": "2019-3-10",
                "itenerary": this.itenerary,
                "facility_1": this.state.facility_1,
                "facility_2": this.state.facility_2,
                "facility_3": this.state.facility_3,
                "facility_4": this.state.facility_4,
                "facility_5": this.state.facility_5,
                "facility_6": this.state.facility_6,
                "facility_7": this.state.facility_7,
                "facility_8": this.state.facility_8,
                "guarantee_1": this.state.guarantee_1,
                "guarantee_2": this.state.guarantee_2,
                "guarantee_3": this.state.guarantee_3,
                "guarantee_4": this.state.guarantee_4,
            }

        }).then(resp => {
            console.log(resp)
            this.Alert.success('Sukses', 'Anda Telah Berhasil menambahkan paket')
            setTimeout(() => {
                window.location = process.env.REACT_APP_URL + 'partner/product'
            }, 3000)
        }).catch(error => {
            console.log(error)
            this.Alert.error('Error!', 'Terjadi Kesalahan saat menambahkan paket')
        })
    }

    render() {
        return (
            <div className="row">
                <div className="vendorProductAdd">
                    <div className="col-12 px-2">
                        <div className="card shadow-sm">
                            <div className="card-header bg-danger">
                                <h5 className="mb-0 text-white">New Package</h5>
                            </div>
                            <div className="card-body bg-white px-5 border-0">
                                <form onSubmit={this.handleSubmit}>
                                    <h5 className="mt-5">Package Detail</h5>
                                    <div className="dropdown-divider"></div>
                                    <div className="row">
                                        <label htmlFor="txtPackageTitle" className="col-md-4 col-form-label">Image Product</label>
                                        <div className="form-group col-md-8">
                                            <input type="file" className="form-control" id="fileImage"  required/>
                                            <small className="form-text text-muted">Upload Your Image Here</small>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="txtPackageTitle" className="col-md-4 col-form-label">Package Name</label>
                                        <div className="form-group col-md-8">
                                            <input type="text" className="form-control" id="txtPackageTitle" onChange={(e) => { this.handleChange(e, 'txt_title') }} placeholder="Enter Package Title" />
                                            <small className="form-text text-muted">Input Your Product Package Title Here</small>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="txtTourDestination" className="col-md-4 col-form-label">Tour Destination</label>
                                        <div className="form-group col-md-8">
                                            {/* <input type="text" className="form-control" id="txtTourDestination" onChange={(e) => { this.handleChange(e, 'txt_destination') }} placeholder="Enter Destination" /> */}
                                            <select className="form-control" id="txtTourDestination" onChange={(e) => { this.handleChange(e, 'txt_destination') }}>
                                                <option value="">Choise Destination</option>
                                                {this.destinationList()}
                                            </select>
                                            <small className="form-text text-muted">Your Tour And Travel Destination</small>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="txtPackageTitle" className="col-md-4 col-form-label">Pick Up Location</label>
                                        <div className="form-group col-md-8">
                                            <input type="text" className="form-control" id="txt_pickup_location" onChange={(e) => { this.handleChange(e, 'pickup_location') }} placeholder="Enter Location Here" />
                                            <small className="form-text text-muted">Input Location Here</small>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="txtTourDuration" className="col-md-4 col-form-label">Tour Duration</label>
                                        <div className="form-group col-md-3">
                                            <div className="input-group">
                                                <input type="number" value={this.state.count_day ? this.state.count_day : ""} className="form-control"  placeholder="Day Duration" min="1" max="99" size="1" maxLength="2" onChange={(e) => { this.setState({ count_day: e.target.value, count_night: e.target.value - 1 }) }} />
                                                <div className="input-group-append">
                                                    <span className="input-group-text">Day</span>
                                                </div>
                                            </div>
                                            <small className="form-text text-muted">Day Duration</small>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <div className="input-group">
                                                <input type="number" value={this.state.count_night ? this.state.count_night : ""} className="form-control" placeholder="Night Duration" min="1" max="99" size="1" maxLength="2" onChange={(e) => { this.setState({ count_night: e.target.value }) }} />
                                                <div className="input-group-append">
                                                    <span className="input-group-text">Night</span>
                                                </div>
                                            </div>
                                            <small className="form-text text-muted">Night Duration</small>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="txtTourDestination" className="col-md-4 col-form-label">Tour Category</label>
                                        <div className="form-group col-md-8">
                                            <select className="form-control custom-select" onChange={(e)=>{this.handleChange(e, 'txt_category')}}>
                                                <option value="">Choise Tour Category</option>
                                                {this.categoryList()}
                                            </select>
                                            <small className="form-text text-muted">Tour Category</small>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="txtTourDestination" className="col-md-4 col-form-label">Short Description</label>
                                        <div className="form-group col-md-8">
                                            <textarea className="form-control" placeholder="Your short description here" onChange={(e) => { this.handleChange(e, 'txt_shortdesc') }}></textarea>
                                            <small className="form-text text-muted">Little Description Here</small>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="txtTourDescription" className="col-md-4 col-form-label">Description</label>
                                        <div className="form-group col-md-8">
                                            <Editor apiKey='14x3qtva4rbkrojckjy1k0kvozhlx9r06yyd56avyqq6vol7' onChange={(e) => { this.handleEditorChange(e, 'txt_description') }} />
                                            <small className="form-text text-muted">Little Description Here</small>
                                        </div>
                                    </div>
                                    {this.state.count_day === 0 ?
                                        null :
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label htmlFor="txtTourDescription" className="col-form-label">Itenerary</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                                    {this.createEditorNav()}
                                                </ul>
                                                <div className="tab-content">
                                                    {this.createEditor()}
                                                </div>
                                            </div>
                                        </div>
                                    }



                                    <h5 className="mt-5">Facility</h5>
                                    <div className="dropdown-divider"></div>
                                    <div className="row">
                                        <div className="form-group col-md-4">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="facility_1" onChange={
                                                    () => {
                                                        this.setState({
                                                            facility_1: !this.state.facility_1
                                                        })
                                                        console.log(this.state.facility_1)
                                                    }} />
                                                <label className="form-check-label" htmlFor="facility_1">
                                                    Include Tour Gate
                                                </label>
                                                <small className="form-text text-muted">Facility</small>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="facility_2" onChange={
                                                    () => {
                                                        this.setState({
                                                            facility_2: !this.state.facility_2
                                                        })
                                                        console.log(this.state)
                                                    }} />
                                                <label className="form-check-label" htmlFor="facility_2">
                                                    Include Hotel
                                                </label>
                                                <small className="form-text text-muted">Facility</small>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="facility_3" onChange={
                                                    () => {
                                                        this.setState({
                                                            facility_3: !this.state.facility_3
                                                        })
                                                        console.log(this.state)
                                                    }} />
                                                <label className="form-check-label" htmlFor="facility_3">
                                                    Include Transportation
                                                </label>
                                                <small className="form-text text-muted">Facility</small>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="facility_4" onChange={
                                                    () => {
                                                        this.setState({
                                                            facility_4: !this.state.facility_4
                                                        })
                                                        console.log(this.state)
                                                    }} />
                                                <label className="form-check-label" htmlFor="facility_4">
                                                    Include Meals
                                                </label>
                                                <small className="form-text text-muted">Facility</small>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="facility_5" onChange={
                                                    () => {
                                                        this.setState({
                                                            facility_5: !this.state.facility_5
                                                        })
                                                        console.log(this.state)
                                                    }} />
                                                <label className="form-check-label" htmlFor="facility_5">
                                                    Include Activity Tickets
                                                </label>
                                                <small className="form-text text-muted">Facility</small>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="facility_6" onChange={
                                                    () => {
                                                        this.setState({
                                                            facility_6: !this.state.facility_6
                                                        })
                                                        console.log(this.state)
                                                    }} />
                                                <label className="form-check-label" htmlFor="facility_6">
                                                    Include Flight One Way
                                                </label>
                                                <small className="form-text text-muted">Facility</small>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="facility_7" onChange={
                                                    () => {
                                                        this.setState({
                                                            facility_7: !this.state.facility_7
                                                        })
                                                        console.log(this.state)
                                                    }} />
                                                <label className="form-check-label" htmlFor="facility_7">
                                                    Include Flight Two Way
                                                </label>
                                                <small className="form-text text-muted">Facility</small>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="facility_8" onChange={
                                                    () => {
                                                        this.setState({
                                                            facility_8: !this.state.facility_8
                                                        })
                                                        console.log(this.state)
                                                    }} />
                                                <label className="form-check-label" htmlFor="facility_8">
                                                    Include Baggage
                                                </label>
                                                <small className="form-text text-muted">Facility</small>
                                            </div>
                                        </div>
                                    </div>

                                    <h5 className="mt-5">Guarantee</h5>
                                    <div className="dropdown-divider"></div>
                                    <div className="row">
                                        <div className="form-group col-md-4">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="guarantee_1" onChange={
                                                    () => {
                                                        this.setState({
                                                            guarantee_1: !this.state.guarantee_1
                                                        })
                                                        console.log(this.state.guarantee_1)
                                                    }} />
                                                <label className="form-check-label" htmlFor="guarantee_1">
                                                    Refund
                                                </label>
                                                <small className="form-text text-muted">Guarantee</small>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="guarantee_2" onChange={
                                                    () => {
                                                        this.setState({
                                                            guarantee_2: !this.state.guarantee_2
                                                        })
                                                        console.log(this.state)
                                                    }} />
                                                <label className="form-check-label" htmlFor="guarantee_2">
                                                    E-Voucher
                                                </label>
                                                <small className="form-text text-muted">Guarantee</small>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="guarantee_3" onChange={
                                                    () => {
                                                        this.setState({
                                                            guarantee_3: !this.state.guarantee_3
                                                        })
                                                        console.log(this.state)
                                                    }} />
                                                <label className="form-check-label" htmlFor="guarantee_3">
                                                    Flexible
                                                </label>
                                                <small className="form-text text-muted">Guarantee</small>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="guarantee_4" onChange={
                                                    () => {
                                                        this.setState({
                                                            guarantee_4: !this.state.guarantee_4
                                                        })
                                                        console.log(this.state)
                                                    }} />
                                                <label className="form-check-label" htmlFor="guarantee_4">
                                                    Fast Check In
                                                </label>
                                                <small className="form-text text-muted">Guarantee</small>
                                            </div>
                                        </div>
                                    </div>

                                    <h5 className="mt-5">Price And Stock</h5>
                                    <div className="dropdown-divider"></div>
                                    <div className="row">
                                        <label htmlFor="txtTotalStock" className="col-md-4 col-form-label">Stock And Minimum Order</label>
                                        <div className="form-group col-md-4">
                                            <input type="number" className="form-control" id="txtTotalStock" placeholder="Enter Stock" min="1" max="100" onChange={e => { this.handleChange(e, 'txt_stock') }} />
                                            <small className="form-text text-muted">Stock</small>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <input type="number" className="form-control" id="txtMinimumPrice" placeholder="Minimum Order" min="1" max="100" onChange={e => { this.handleChange(e, 'txt_minimum_order') }} />
                                            <small className="form-text text-muted">Minimum Order</small>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="txtPricePerPax" className="col-md-4 col-form-label">Price Per Pax</label>
                                        <div className="form-group col-md-4">
                                            <input type="text" className="form-control" id="txtPricePerPax" placeholder="Price Per Pax" onChange={e => { 
                                                let total_price = parseInt(e.target.value) + (0.05 * parseInt(e.target.value)) + 5000
                                                this.setState({ price: event.target.value, total_price: total_price }) 
                                                }} />
                                            <small className="form-text text-muted">Payment Gateway Fee + Rp 5000 <br /> Transaction Fee + 5% From Total Price</small>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="txtTotalPrice" className="col-md-4 col-form-label">Total Estimation</label>
                                        <div className="form-group col-md-4">
                                            <h4>Rp {(parseInt(this.state.total_price)).toLocaleString()}</h4>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center py-4">
                                        <div className="col-md-3">
                                            <button type="submit" className="btn btn-primary btn-block px-3" style={{ borderRadius: 25 }}>Submit</button>
                                        </div>
                                        <div className="col-md-3">
                                            <button type="reset" className="btn btn-danger btn-block px-3" style={{ borderRadius: 25 }}>Reset</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CProduct;