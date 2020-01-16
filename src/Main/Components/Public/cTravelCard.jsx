import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './style/sTravelCard.css'

class CTravelCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // Label for currency range price
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

    getFacility(data_map) {
        var array = []
        var facility = data_map.split(",")
        for (let i = 0; i < facility.length; i++) {
            if (facility[i].includes('hotel')) {
                array.push(<span className="badge badge-danger p-1" key={i}><i className="fa fa-bed" /></span>)
            } else if (facility[i].includes('transportation')) {
                array.push(<span className="badge badge-danger p-1 " key={i}><i className="fa fa-bus" /></span>)
            } else if (facility[i].includes('meals')) {
                array.push(<span className="badge badge-danger p-1 " key={i}><i className="fa fa-cutlery" /></span>)
            } else {
                array.push(<span className="badge badge-danger p-1 " key={i}><i className="fa fa-ticket" /></span>)
            }
        }
        return array
    }

    render() {
        return (
            <div className="row travel-card">
                {this.props.data.map((data_map, i) => {
                    return (
                        <div className="col-md-4 mb-4" key={i}>
                            <div className="card shadow">
                                <img className="card-img-top" src={process.env.REACT_APP_CDN_PRODUCT + data_map.image} />
                                <div className="card-body white p-3">
                                    <p className="f-secondary-color">
                                        <span>{data_map.name}</span>
                                        {/* <span className="text-info">
                                            <i className="fa fa-star" />
                                            4,5 | 99 Kali diulas
                                        </span> */}
                                    </p>
                                    <p className="mb-0">
                                        {
                                            new this.getFacility(data_map.facility)
                                        }
                                        <span className="badge badge-danger p-1 ">
                                            <i >{data_map.duration}</i>
                                        </span>
                                    </p>
                                    <br/>
                                    <div className="clearfix mb-0">
                                        <h6 className="float-left mt-2">Rp {this.formatCurrency(data_map.base_price)}</h6>
                                        <Link to={"/travel/detail/" + data_map.slug} className="btn btn-danger btn-sm mt-1 float-right">
                                            Pesan
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                }
            </div>

        );

    }
}
export default CTravelCard;
