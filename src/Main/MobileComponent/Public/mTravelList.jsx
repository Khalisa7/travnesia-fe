import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './style/sMobileTravelList.css'
import ContentLoader from '../../ContentLoader/MobileView/MobileTravelLoader'
import $ from 'jquery'
import axios from 'axios'
import Modal from 'react-awesome-modal'
import CRating from '../../Components/Public/cRating'
import DatePicker from 'react-datepicker/es'
import Citilink from './img/citilink.png'
import Translations from '../../../localization/translations.js'
import LocalizedStrings from 'react-localization'

import queryString from "query-string"
import CartService from "../../../_services/customers/cart/CartService"


class MTravelList extends Component{
	constructor (props){
        super(props)
        this.CartService = new CartService()
        this.params = queryString.parse(window.location.search)
        
		this.state = {
			visible1 : false,
			visible2 : false,
            rangePrice: this.params.high_price || "0",
            params: this.params,
      
            //params for searching
            q: this.params.q || "Available packages",
      
            //params for sorting
            sortPrice: this.params.sort_price || "",
            //params for filter
            startDate: this.params.date || this.CartService.formatDate(new Date()),
            
            
            
			data: [],
			
			date : '',
			keyword: '',
			loader: '',
			content: <ContentLoader/>
		}
		this.fetchData = this.fetchData.bind(this)
        this.getFacility = this.getFacility.bind(this)
		this.Translations = new Translations()
        var translate = this.Translations.locale()
        this.lang = new LocalizedStrings({ translate });

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.SortSearch = this.SortSearch.bind(this)
        this.SortPopular = this.SortPopular.bind(this)
    }

    componentDidMount() {
        var apiGetTravelList = process.env.REACT_APP_ENDPOINT + 'product/travel'

        $('input').focus(
            function () {
                $(this).parent('.input-group').css('box-shadow', '0px 0px 0px 2px rgba(120, 179, 255, 0.767)')
            }
        )
        $('input').focusout(
            function () {
                $(this).parent('.input-group').css('box-shadow', 'none')
            }
        )

        if (window.location.search === "") {
            this.fetchData(apiGetTravelList);
            console.log("Travel List API")
          } else {
            this.SearchGo()
            document.getElementById('txtTujuan').value = this.state.params.q || ""
            console.log("Searching API")
          }
          // this.fetchData(apiGetTravelList);
        //   setTimeout(() => this.setState({ loader: false }), 900)
    }

    fetchData(api) {
        fetch(api)
            .then(res => { return res.json() })
            .then(dataRes => {
                var data_map = dataRes.result.map((data) => {
                    return data
                })
                this.setState({
                    data: data_map
                })
                setTimeout(() => this.setState({ content: this.content() }), 1500)
            }).catch(
                error => console.log(error)
            )
    }


    handleSubmit(event) {
        event.preventDefault();
        console.log(event)
        axios({
          url: process.env.REACT_APP_ENDPOINT + "product/travel/search",
          method: "GET",
          mode: "cors",
          params: {
            q: this.state.q
          },
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res => {
          return res.json();
        }).then(dataRes => {
          var data_map = dataRes.result.map(data => {
            return data;
          });
          console.log(data_map)
          this.setState({ data: data_map });
          setTimeout(() => this.setState({ content: this.content() }), 1500)
        })
          .catch(error => console.log(error));
      }

    setGetParameter(paramName, paramValue) {
        var url = window.location.href;
        var hash = window.location.hash;
        url = url.replace(hash, '');
        if (url.indexOf("?") >= 0) {
            var params = url.substring(url.indexOf("?") + 1).split("&");
            var paramFound = false;
            params.forEach(function (param, index) {
                var p = param.split("=");
                if (p[0] == paramName) {
                    params[index] = paramName + "=" + paramValue;
                    paramFound = true;
                }
            });
            if (!paramFound) params.push(paramName + "=" + paramValue);
            url = url.substring(0, url.indexOf("?") + 1) + params.join("&");
        }
        else
            url += "?" + paramName + "=" + paramValue;
        window.history.pushState({ path: url }, '', url + hash)
        // window.location.href = url + hash;
    }

    SearchGo() {
        axios({
          url: process.env.REACT_APP_ENDPOINT + "product/travel/search",
          method: "GET",
          mode: "cors",
          params: this.params,
          headers: {
            "Content-Type": "application/json"
          }
        }).then(dataRes => {
          var data_map = dataRes.data.result.data.map(data => {
            return data;
          });
          console.log(dataRes)
          this.setState({ data: data_map });
          setTimeout(() => this.setState({ content: this.content() }), 1500)
        })
          .catch(error => console.log(error));
      }
    
      SortSearch(param){
        // console.log(event.target.value)
        this.setState({
          sortPrice: param
        })
        if(param){
          this.setGetParameter('sort_price', param)
          this.params = queryString.parse(window.location.search)
          this.SearchGo()
        }
      }
    
      SortPopular(param){
          this.setGetParameter('popular', param)
          this.params = queryString.parse(window.location.search)
          this.SearchGo()
      }
    

    handleDayChange(day) {
        this.setState({ date: day })
        console.log(this.state)
    }
  // Update range price data
    update_RangePrice(event) {
        this.setState({ rangePrice: event.target.value });
        this.setGetParameter('low_price', 0)
        this.setGetParameter('high_price', event.target.value)
        this.params = queryString.parse(window.location.search)
        this.SearchGo()
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
            return null
        }
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value
        const name = target.name;
    
        this.setState({
          [name]: value
    
        });
        console.log(this.state)
      }
    
      handleInputDay(selectedDay) {
        let data = this.CartService.formatDate(selectedDay)
        console.log(data)
        this.setState({
          startDate: data
        })
        console.log(this.state)
      }

    getFacility(data){
        var array = []
        var facility = data.split(",")
        for( let i=0;i<facility.length;i++){
            if(facility[i].includes('hotel')){
                array.push(<span className="badge badge-danger p-1 mr-1" key={i}>
                                <i className="fa fa-bed" />
                            </span>)
            } else if(facility[i].includes('transportation')){
                array.push(<span className="badge badge-danger p-1 mr-1" key={i}>
                                <i className="fa fa-bus" />
                            </span>)
            } else if(facility[i].includes('meals')){
                array.push(<span className="badge badge-danger p-1 mr-1" key={i}>
                                <i className="fa fa-cutlery" />
                            </span>)
            } else {
                array.push(<span className="badge badge-danger p-1 mr-1" key={i}>
                                <i className="fa fa-credit-card" />
                            </span>)
            }
        } return array
    }

	content(){
		return(
            this.state.data.map((data_map, i) => {
                return (
                    <div className="col-md-12 px-0" key={i}>
                        <div className="card mb-3">
                            <div className="row no-gutters">
                                <div className="col-4">
                                    <img src={process.env.REACT_APP_CDN_PRODUCT + data_map.image} style={{objectFit:"cover", height:100+"%", width:100+"%"}} alt="" />
                                </div>
                                <div className="col-8">
                                    <div className="card-body">
                                        <h6 className="card-title">{data_map.name}</h6>
                                        { this.getFacility(data_map.facility)}
                                        <br/>
                                        <i className="fa fa-money fa-fw d-inline text-success" />
                                        <h6 className="f-fourth-color d-inline ml-2">Rp { this.formatCurrency(data_map.base_price )}</h6>
                                        <Link to={"/travel/detail/" + data_map.slug}  className="btn btn-danger btn-sm mt-2 float-right my-4">{this.lang.book_now}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }

    render() {
        return (
            <div className='mobile-travel-list'>
                <div className='container'>
                    <h6>Hasil pencarian untuk {this.state.q}</h6>
                        {this.state.content}
                </div>
                <footer className="fixed-bottom bottom-menu bottom-top">
                    <div className="row ">
                        <div className="col-6 text-center" data-toggle="modal" data-target="#lab-slide-bottom-popup" >
                            <i className="fa fa-lg fa-search f-primary-color"></i>
                            <div className="bottom-menu-title">Ganti Pencarian</div>
                        </div>
                        <div className="col-6 text-center" data-toggle="modal" data-target="#lab-slide-bottom-popup2" >
                            <i className="fa fa-lg fa-align-left f-primary-color"></i>
                            <div className="bottom-menu-title">Filter</div>
                        </div>
                    </div>
                </footer>

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
                                        <form action={process.env.REACT_APP_URL + 'travel/search'} method="get" className="p-3">
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
                                                <div className="col-8">
                                                    <div className="form-group">
                                                        <label htmlFor="txtPax"> Jumlah </label>
                                                        <input type="text" className="form-control" name="count" id="txtPax" aria-describedby="txtPax" placeholder="Jumlah Pax" />

                                                    </div>
                                                </div>
                                                {/* <div className="col-8">
                                                    <div className="form-group">
                                                        <label>
                                                            Rating
                                                        </label>
                                                        <CRating />
                                                    </div>
                                                </div> */}
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="txtPax"> Tanggal </label> <br />
                                                        <DatePicker className="form-control"
                                                           id="txtDate"
                                                           selected={new Date(this.state.startDate)}
                                                           value={this.state.startDate}
                                                           name="date"
                                                           format={"YYYY-M-D"}
                                                           minDate={new Date()}
                                                           onChange={date => this.handleInputDay(date)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <button className="btn btn-travnesia btn-block" type="submit" >
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

                <div className="modal fade" id="lab-slide-bottom-popup2" tabIndex="-1" role="dialog" aria-labelledby="lab-slide-bottom-popup2" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-danger">
                                <h5 className="modal-title text-white" id="exampleModalLabel">Filter</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12">
                                        <h5 className="px-3 pt-4"> {this.lang.search_box_title} </h5>
                                        <h6 className="px-3"> We Make It Simple </h6>
                                        <form action="" method="post" className="p-3">
                                            <h6>Berdasarkan Budget</h6>
                                            <div className='row justify-content-center'>
                                                <div className='collapse show b-0 mt-2' id='filter2' style={{ width: 300 }}>
                                                    <div className='form-row'>
                                                        <div className='col-5'>
                                                            <div className='form-check float-left' style={{ paddingLeft: 0 }}>
                                                                <label className='form-check-label' htmlFor='highestPrice'>
                                                                    Rp 0 ,00
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className='col-7'>
                                                            <div className='form-check float-right'>
                                                                <label className='form-check-label' htmlFor='lowestPrice'>
                                                                    Rp {this.formatCurrency(this.state.rangePrice)}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <input type='range' className='custom-range' min={0} max={15000000} step={50000} value={this.state.rangePrice} onChange={event => this.update_RangePrice(event)} />
                                                </div>
                                            </div>
                                            <div className='row container mt-2'>
                                                <h6>Berdasarkan Harga</h6>
                                                <div className='col-md-12'>
                                                    <div className='collapse show b-0 mt-2' id='filter1'>
                                                        <div className='form-row'>
                                                            <div className='form-check'>
                                                                <input className='form-check-input' type="radio"
                                                                    name="sortPrice"
                                                                    id="highestPrice"
                                                                    checked={this.state.sortPrice === 'HIGH'}
                                                                    onChange={() => this.SortSearch('HIGH')} />
                                                                <label className='form-check-label' htmlFor='highestPrice'>
                                                                    Highest Price
                                                                </label>
                                                                <br />
                                                                <input className='form-check-input' type='radio' name="sortPrice"
                                                                    id="lowestPrice"
                                                                    checked={this.state.sortPrice === 'LOW'}
                                                                    onChange={() => this.SortSearch('LOW')} />
                                                                <label className='form-check-label' htmlFor='lowestPrice'>
                                                                    Lowest Price
                                                                </label>
                                                                <br />
                                                                <input className='form-check-input' type='radio' name="reviewScore"
                                                                    id="reviewScore"
                                                                    checked={this.params.popular === 'false'}
                                                                    onChange={() => { this.SortPopular('false') }} />
                                                                <label className='form-check-label' htmlFor='riviewScore'>
                                                                    Riview Score
                                                                </label>
                                                                <br />
                                                                <input className='form-check-input' type='radio' name="reviewScore"
                                                                    id="highestPopularity"
                                                                    checked={this.params.popular === 'true'}
                                                                    onChange={() => { this.SortPopular(true) }} />
                                                                <label className='form-check-label' htmlFor='highestPopularity'>
                                                                    Highest Popularity
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row mt-2'>
                                                <div className='col-md-12'>
                                                    <h6>Berdasarkan Rating</h6>
                                                    <div className='collapse show b-0 mt-2 justify-content-center container' id='filter3'>
                                                        <div className='form-row form-rating'>
                                                            <div className='form-check'>
                                                                <input className='form-check-input' type='checkbox' value='' />
                                                                <label className='form-check-label' htmlFor='star'>
                                                                    <span>
                                                                        <i className='fa fa-star' />
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className='form-row form-rating'>
                                                            <div className='form-check'>
                                                                <input className='form-check-input' type='checkbox' value='' />
                                                                <label className='form-check-label' htmlFor='star'>
                                                                    <span>
                                                                        <i className='fa fa-star' />
                                                                        <i className='fa fa-star' />
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className='form-row form-rating'>
                                                            <div className='form-check'>
                                                                <input className='form-check-input' type='checkbox' value='' />
                                                                <label className='form-check-label' htmlFor='star'>
                                                                    <span>
                                                                        <i className='fa fa-star' />
                                                                        <i className='fa fa-star' />
                                                                        <i className='fa fa-star' />
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className='form-row form-rating'>
                                                            <div className='form-check'>
                                                                <input className='form-check-input' type='checkbox' value='' />
                                                                <label className='form-check-label' htmlFor='star'>
                                                                    <span>
                                                                        <i className='fa fa-star' />
                                                                        <i className='fa fa-star' />
                                                                        <i className='fa fa-star' />
                                                                        <i className='fa fa-star' />
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className='form-row form-rating'>
                                                            <div className='form-check'>
                                                                <input className='form-check-input' type='checkbox' value='' />
                                                                <label className='form-check-label' htmlFor='star'>
                                                                    <span>
                                                                        <i className='fa fa-star' />
                                                                        <i className='fa fa-star' />
                                                                        <i className='fa fa-star' />
                                                                        <i className='fa fa-star' />
                                                                        <i className='fa fa-star' />
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn-danger btn-block" data-dismiss="modal" aria-label="Close">
                                                Ubah Filter
                                            </button>
                                        </form>
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
export default MTravelList