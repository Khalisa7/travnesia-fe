import React, { Component } from 'react';
import './style/sUserHistory.css'
import Citilink from '../Public/img/citilink.png'
import OrderService from '../../../_services/customers/OrderService'


class CUserHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }

        this.OrderService = new OrderService()
    }

    componentDidMount() {
        this.OrderService.getHistory()
            .then(res => {
                let data_map = res.result.map(data => {
                    return data
                })
                this.setState({ data: data_map })
            })
            .catch(error => console.log(error))
    }

    //currency total amount 
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

    content() {
        if(this.state.data == ''){
            return (
                <div className="alert alert-warning">
                    <strong>Oops!</strong> Tidak ada Transaksi.
                </div>
            )
        } else {
        return (
            <div className="row history-content">
                {this.state.data.map((data_map, i) => {
                    return (<div className="col-md-12 mb-4">
                        <div className="media shadow rounded" key={i}>
                            <div className="media-body p-3">
                                <img src={Citilink} width={30} />
                                <div className="history-name">
                                   <a href={'/payment/product?order_id=' + data_map.orderId}>  <h5>{data_map.package_name}</h5></a>
                                    <p>By {data_map.vendor.companyname}</p>
                                </div>
                                <table className="table table-sm table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>Person</td>
                                            <td>{data_map.qty}</td>
                                        </tr>
                                        <tr>
                                            <td>Total</td>
                                            <td> <i>Rp {this.formatCurrency(data_map.total)}</i></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td className="float-right">
                                                <button className="btn btn-danger btn-sm mt-1">Detail</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
        )
        }
    }

    render() {
        return (
            <div>
                <div className='user-history'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='card shadow mb-4'>
                                <div className='card-header bg-info'>
                                    <h5 className="text-white">History</h5>
                                </div>
                            </div>
                            {this.content()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CUserHistory;