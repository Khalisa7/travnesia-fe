import React, { Component } from "react";
import { Typeahead } from "react-bootstrap-typeahead";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import CRating from "./cRating";
import CTravelCard from "./cTravelCard";
import ContentLoader from "./../../ContentLoader/DesktopView/TravelListingLoader";
import queryString from "query-string"
import CartService from "../../../_services/customers/cart/CartService"
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import "react-bootstrap-typeahead/css/Typeahead-bs4.css";
import "react-day-picker/lib/style.css";
import "./style/sTravelList.css";
;

class CTravelList extends Component {
  constructor(props) {
    super(props);
    this.CartService = new CartService()
    this.params = queryString.parse(window.location.search)
    this.state = {
      visible1: false,
      visible2: false,
      rangePrice: this.params.high_price || "0",
      params: this.params,

      //params for searching
      q: this.params.q || 'All Packages',

      //params for sorting
      sortPrice: this.params.sort_price || "",
      //params for filter
      startDate: this.params.date || this.CartService.formatDate(new Date()),

      data: [],
      content: <ContentLoader />,
      loader: true
    };

    this.rotateIcon = this.rotateIcon.bind(this);
    this.update_RangePrice = this.update_RangePrice.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.SortSearch = this.SortSearch.bind(this)
    this.SortPopular = this.SortPopular.bind(this)
  }

  componentDidMount() {
    document.title = "Cari paket liburan murah di Indonesia maupun seluruh dunia " + " - " + process.env.REACT_APP__NAME
    var apiGetTravelList = process.env.REACT_APP_ENDPOINT + "product/travel";
    $("input").focus(function () {
      $(this)
        .parent(".input-group")
        .css("box-shadow", "0px 0px 0px 2px rgba(120, 179, 255, 0.767)");
    });
    $("input").focusout(function () {
      $(this)
        .parent(".input-group")
        .css("box-shadow", "none");
    });

    if (window.location.search === "") {
      this.fetchData(apiGetTravelList);
      // console.log("Travel List API")
    } else {
      this.SearchGo()
      document.getElementById('txtTujuan').value = this.state.params.q || ""
      // console.log("Searching API")
    }
    // this.fetchData(apiGetTravelList);
    setTimeout(() => this.setState({ loader: false }), 900)
  }

  fetchData(api) {
    fetch(api)
      .then(res => {
        return res.json();
      })
      .then(dataRes => {
        var data_map = dataRes.result.map(data => {
          return data;
        });
        console.log(data_map)
        this.setState({ data: data_map });
        setTimeout(() => this.setState({ loader: false }), 900)
        this.setState({ content: <CTravelCard data={this.state.data} /> });
      })
      .catch(error => console.log(error));
  }

  // Search form submit
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
      this.setState({ content: <CTravelCard data={this.state.data} /> });
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
      this.setState({ content: <CTravelCard data={this.state.data} /> });
    })
      .catch(error => console.log(error));
  }

  SortSearch(param) {
    // console.log(event.target.value)
    this.setState({
      sortPrice: param
    })
    if (param) {
      this.setGetParameter('sort_price', param)
      this.params = queryString.parse(window.location.search)
      this.SearchGo()
    }
  }

  SortPopular(param) {
    this.setGetParameter('popular', param)
    this.params = queryString.parse(window.location.search)
    this.SearchGo()
  }

  // Date time picker
  handleDayChange(day) {
    this.setState({ date: day });
  }

  // Update range price data
  update_RangePrice(event) {
    this.setState({ rangePrice: event.target.value });
    this.setGetParameter('low_price', 0)
    this.setGetParameter('high_price', event.target.value)
    this.params = queryString.parse(window.location.search)
    this.SearchGo()
  }

  // Label for currency range price
  formatCurrency(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(
        (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
      ).toString();
      let j = i.length > 3 ? i.length % 3 : 0;

      return (
        negativeSign +
        (j ? i.substr(0, j) + thousands : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
        (decimalCount
          ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
          : "")
      );
    } catch (e) {
      return null;
    }
  }

  rotateIcon(iconNumber) {
    switch (iconNumber) {
      case 1:
        this.setState(state => ({
          filterIcon_1: !state.filterIcon_1
        }));
        break;
      case 2:
        this.setState(state => ({
          filterIcon_2: !state.filterIcon_2
        }));
        break;
      case 3:
        this.setState(state => ({
          filterIcon_3: !state.filterIcon_3
        }));
        break;
      default:
        this.setState(state => ({
          filterIcon_1: false,
          filterIcon_2: false
        }));
        break;
    }
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

  render() {
    return (
      <div>
        <Loading
          show={this.state.loader}
          color="red"
          change={true}
        />
        <div className="travel_search py-4 my-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="page-heading clearfix">
                  <h4 className="float-left mt-2">
                    Your search results in {this.state.q}
                  </h4>
                  <button
                    className="btn btn-danger float-right btn-sm mt-1"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseSearch"
                    aria-expanded="false"
                    aria-controls="collapseSearch"
                  >
                    Cari Destinasi Lainnya
                  </button>
                </div>
                <div className="collapse b-0 mt-4" id="collapseSearch">
                  <div className="card shadow">
                    <div className="page-heading p-3">
                      <h5> Booking Paket Travel Tak Pernah Semudah Ini </h5>
                    </div>
                    <div className="card-body pt-4 pb-4 ml-0 mr-0 border-0">
                      <div className="col-md-12">
                        <form action={process.env.REACT_APP_URL + 'travel/search'} method="GET">
                          <div className="row">
                            <div className="col-md-5">
                              <div className="form-group">
                                <label htmlFor="txtTujuan"> Destinasi </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="txtTujuan"
                                  aria-describedby="txtTujuan"
                                  name="q"
                                  onChange={event => this.handleInputChange(event)}
                                  placeholder="Bali, Lombok, Yogyakarta"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="txtKategori"> Kategori </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="txtKategori"
                                  aria-describedby="txtKategori"
                                  name="category"
                                  placeholder="City Tour, Family, Outbound"
                                />
                              </div>
                            </div>
                            <div className="col-md-7">
                              <div className="form-group">
                                <div className="row">
                                  <div className="col-md-6">
                                    <label htmlFor="txtPax"> Jumlah Pax </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="txtPax"
                                      aria-describedby="txtPax"
                                      name="qty"
                                      placeholder="Jumlah Pax"
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label htmlFor="txtPax"> Tanggal </label>
                                    <DatePicker
                                      className="form-control"
                                      selected={new Date(this.state.startDate)}
                                      id="txtDate"
                                      value={this.state.startDate}
                                      name="date"
                                      format={"YYYY-M-D"}
                                      minDate={new Date()}
                                      onChange={date => this.handleInputDay(date)}
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* <div className="form-group">
                                <label>Rating</label>
                                <CRating />
                              </div> */}
                              <div className="form-group">
                                <button
                                  className="btn btn-warning col-6 float-right travel-filter-mrg"
                                  type="submit"
                                >
                                  Cari
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
        </div>


        <div className="travel_filter">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="col-md-4 sticky">
                    <form>
                      <ul className="list-group shadow">
                        <li className="list-group-item bg-white rounded-0 border-0">
                          <div className="page-heading clearfix border-0">
                            <h6 className="float-left mt-2">Sortir Paket</h6>
                            <span className="float-right mt-1">
                              <i
                                className={
                                  this.state.filterIcon_1
                                    ? "fa fa-chevron-up f-white primary-color"
                                    : "fa fa-chevron-down f-primary-color"
                                }
                                data-toggle="collapse"
                                data-target="#filter1"
                                aria-expanded="false"
                                aria-controls="filter1"
                                onClick={() => {
                                  this.rotateIcon(1);
                                }}
                              />
                            </span>
                          </div>
                          <div className="row justify-content-center">
                            <div className="col-md-12">
                              <div
                                className="collapse show b-0 mt-2"
                                id="filter1"
                              >
                                <div className="form-row">
                                  <div className="col p-0">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="sortPrice"
                                        id="highestPrice"
                                        checked={this.state.sortPrice === 'HIGH'}
                                        onChange={() => this.SortSearch('HIGH')}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="highestPrice"
                                      >
                                        Highest Price
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col p-0">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="sortPrice"
                                        id="lowestPrice"
                                        checked={this.state.sortPrice === 'LOW'}
                                        onChange={() => this.SortSearch('LOW')}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="lowestPrice"
                                      >
                                        Lowest Price
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-row">
                                  <div className="col p-0">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="reviewScore"
                                        id="reviewScore"
                                        checked={this.params.popular === 'false'}
                                        onChange={() => { this.SortPopular('false') }}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="riviewScore"
                                      >
                                        Review Score
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col p-0">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="reviewScore"
                                        id="highestPopularity"
                                        checked={this.params.popular === 'true'}
                                        onChange={() => { this.SortPopular(true) }}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="highestPopularity"
                                      >
                                        Highest Popularity
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>

                      <ul className="list-group shadow mt-4">
                        <li className="list-group-item bg-white rounded-0 border-0">
                          <div className="page-heading clearfix">
                            <h6 className="float-left mt-2">
                              Filter Paket Yang Diinginkan
                            </h6>
                            <span className="float-right mt-1">
                              <i
                                className={
                                  this.state.filterIcon_2
                                    ? "fa fa-chevron-up f-white primary-color"
                                    : "fa fa-chevron-down f-primary-color"
                                }
                                data-toggle="collapse"
                                data-target="#filter2"
                                aria-expanded="false"
                                aria-controls="filter2"
                                ref="filter2"
                                onClick={() => {
                                  this.rotateIcon(2);
                                }}
                              />
                            </span>
                          </div>
                          <div className="row justify-content-center">
                            <div className="col-md-12">
                              <div
                                className="collapse show b-0 mt-2"
                                id="filter2"
                              >
                                <div className="form-row range-price">
                                  <div className="col-5">
                                    <div className="loat-left">
                                      <label
                                        className="form-check-label"
                                        htmlFor="highestPrice"
                                      >
                                        Rp 0 ,00
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col-7">
                                    <div className="float-right">
                                      <label
                                        className="form-check-label"
                                        htmlFor="lowestPrice"
                                      >
                                        Rp{" "}
                                        {this.formatCurrency(
                                          this.state.rangePrice
                                        )}
                                      </label>
                                    </div>
                                  </div>
                                </div>

                                <input
                                  type="range"
                                  className="custom-range"
                                  min={0}
                                  max={15000000}
                                  step={1000000}
                                  value={this.state.rangePrice}
                                  onChange={event =>
                                    this.update_RangePrice(event)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item bg-white rounded-0 border-0">
                          <div className="page-heading clearfix">
                            <h6 className="float-left mt-2">
                              Berdasarkan Rekomendasi
                            </h6>
                            <span className="float-right mt-1">
                              <i
                                className={
                                  this.state.filterIcon_3
                                    ? "fa fa-chevron-up f-white primary-color"
                                    : "fa fa-chevron-down f-primary-color"
                                }
                                data-toggle="collapse"
                                data-target="#filter3"
                                aria-expanded="false"
                                aria-controls="filter3"
                                ref="filter3"
                                onClick={() => {
                                  this.rotateIcon(3);
                                }}
                              />
                            </span>
                          </div>
                          <div className="row justify-content-center">
                            <div className="col-md-12">
                              <div
                                className="collapse show b-0 mt-2"
                                id="filter3"
                              >
                                <div className="form-row form-rating">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      value=""
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="star"
                                    >
                                      <span>
                                        <i className="fa fa-star" />
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div className="form-row form-rating">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      value=""
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="star"
                                    >
                                      <span>
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div className="form-row form-rating">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      value=""
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="star"
                                    >
                                      <span>
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div className="form-row form-rating">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      value=""
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="star"
                                    >
                                      <span>
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div className="form-row form-rating">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      value=""
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="star"
                                    >
                                      <span>
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                      </span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </form>
                  </div>
                  <div className="col-md-8">
                    {this.state.content}
                    {/* <CTravelCard data={this.state.data}/> */}
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

export default CTravelList;
