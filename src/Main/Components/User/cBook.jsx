import React, { Component } from 'react';
import "./style/sBook.css";
import OrderService from '../../../_services/customers/OrderService'
import { error } from 'util';
import { Link } from "react-router-dom"
import CActiveBooking from './cActiveBooking'

class CBook extends Component {
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
               
                <div className="userBook">
                    <div className="page-heading pb-4">
                        <h5>Daftar Pesanan Saya</h5>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            
                            <CActiveBooking />
                        </div>               
                    </div>
                </div>
            );
        }
        
    
}

export default CBook;