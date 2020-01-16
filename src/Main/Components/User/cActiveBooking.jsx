import React, { Component } from "react"
import OrderService from '../../../_services/customers/OrderService'



class CActiveBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };

        this.OrderService = new OrderService()

    }
    componentDidMount() {
        this.OrderService.getBooking()
            .then(res => {
                // console.log(res.result)
                let data_map = res.result.map(data => {
                    return data
                })
                this.setState({ data: data_map })
            })
            .catch(error => console.log(error))
    }
    formatCurrency(amount, decimalCount = 2, decimal = ',', thousands = ',') {
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
    render() {
        if (this.state.data == '') {
            return (
                <div className="userBook">
                    <div className="alert alert-warning">
                        <strong>Oops!</strong> Tidak ada Transaksi.
            </div>
                </div>
            )
        } else {
            return (
                <div className="userBook">
                    <div className="row">
                        <div className="col-12">
                            {this.state.data.map((data_map, i) => {
                                return (
                                    <div className="card bg-white mb-2" >
                                        <div className="card-header bg-danger text-white" key={i}>
                                            <div className="clearfix">
                                                <h6 className="float-left mb-0">Active Booking</h6>
                                                <h6 className="float-right mb-0">{data_map.date_booking}</h6>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">

                                                <div className="col-md-3 col-6">
                                                    <h6 className="text-muted">Total Tagihan</h6>
                                                    <h6>Rp. {this.formatCurrency(data_map.total)}</h6>
                                                </div>
                                                <div className="col-md-3 col-6">
                                                    <h6 className="text-muted">Nomor Booking</h6>
                                                    <h6>{data_map.order_number}</h6>
                                                    <span></span>
                                                </div>
                                                <div className="col-md-3">
                                                    <h6 className="text-muted">Destinasi</h6>
                                                    <h6>{data_map.destination}</h6>
                                                </div>
                                                <div className="col-md-3">
                                                    <a href="" className="btn btn-sm btn-outline-info rounded-0 btn-block">
                                                        <i className='fa fa-eye float-left mt-1'></i>
                                                        Detail Order</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )
        }

    }
}
export default CActiveBooking;