import React, { Component } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import './style/sUserBook.css'
import Translations from '../../../localization/translations.js'
import LocalizedStrings from 'react-localization'
import OrderService from '../../../_services/customers/OrderService'

class CUserBook extends Component {
    constructor(props) {
        super(props)
        this.removeTodo = this.removeTodo.bind(this)

        this.state = {
            mobile: false,
            data: [],
            text: ''
        }

        this.OrderService = new OrderService()
        this.Translations = new Translations()
        var translate = this.Translations.locale()
        this.lang = new LocalizedStrings({ translate });
    }

    componentDidMount() {
        this.OrderService.getBooking()
            .then(res => {
                // return console.log(res.result)
                // {/* {console.log(this.state.data)} */}
                let data_map = res.result.map(data => {
                    return data
                })
                this.setState({ data: data_map })
            })
            .catch(error => console.log(error))
    }
    removeTodo(i) {
        let data_slice = this.state.data
        data_slice.splice(i, 1)
        this.setState({ data: data_slice })
    }
    render() {
        return (
            <div>
                <div className='book'>
                    <div className='page-heading'>
                        <h5>{this.lang.your_booking}</h5>
                        <hr />
                    </div>
                    <form action=''>
                        <div className='row pt-2 justify-content-center'>
                            <div className={this.state.mobile ? 'col-md-12 mb-4' : 'col-md-12'} style={{ marginBottom: 40 + "px" }}>
                                <Book data={this.state.data} removeTodo={this.removeTodo} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

class Book extends Component {
    removeItem(i) {
        this.props.removeTodo(i)
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

    formatDate(date) {
        let monthNames;
        monthNames = [
            "Januari", "Feburari", "Maret",
            "April", "Mei", "Juni", "Juli",
            "Agustus", "September", "Oktober",
            "November", "Desember"
        ];

        var getDate = new Date(date)
        var day = getDate.getDate()
        var monthIndex = getDate.getMonth()
        var year = getDate.getFullYear()
        return day + ' ' + monthNames[monthIndex] + ' ' + year
	}

    render() {
            return (
                <div>
                    {this.props.data.map((data_map, i) => {
                        return (
                            <div className='card shadow mb-4 bg-white py-2' key={i}>
                                <div className='card-body bg-white'>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <h6 className="mb-0">Nomor Pesanan : {data_map.order_number} </h6>
                                            <p>Tanggal Pemesanan : {this.formatDate(data_map.date_booking)}</p>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='clearfix'>
                                                <h6 className='float-left'>Jumlah Total : </h6>
                                                <h6 className='float-right'>Rp {this.formatCurrency(data_map.total)}</h6>
                                            </div>
                                            <div className='clearfix'>
                                                <a href={'/payment/product?order_id=' + data_map.order_number} className='btn btn-info btn-sm border-0 float-right'>Lihat Order</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            );
        // }
        
     } 
}

export default CUserBook
