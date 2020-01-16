import React, { Component } from 'react';
import './style/sHome.css'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import Translations from '../../../localization/translations.js'
import LocalizedStrings from 'react-localization'
import Cookies from 'universal-cookie';
import CDashRingkasanPenjualan from './cDashRingkasanPenjualan'
import CDashRingkasanTransaksi from './cDashRingkasanTransaksi'
import deviceList from './file.json'
import orderService from '../../../_services/vendor/transactionService'

const cookies = new Cookies();

class CHome extends Component {

	constructor() {
		super()
		this.state = {
            paid : [],
            alltrans : []
		}

        this.orderService = new orderService()
		//Translations
		this.Translations = new Translations()
		var Locale = this.Translations.locale()
		this.langCode = cookies.get('lang')
        this.lang = new LocalizedStrings({ Locale })
        // this.order = this.order.bind(this)
	}

	componentDidMount() {
        this.orderService.getTransaction()
        .then(res =>{
            let alltrans = []
            let paid = []

            res.result.map((data)=> {
                if(data.status == 'capture' || data.status == 'success'){
                    paid.push(data)
                } else {
                    alltrans.push(data)
                }
            })

            this.setState({ paid : paid })
            this.setState({ alltrans : alltrans })
        })
        .catch(error => console.log(error))
    }

    // order(){
    //     this.orderService.getOrder()
    //     .then(res => {
    //         let data_map = res.result.map(data => {
    //             return data
    //         })
    //         this.setState({ data_order : data_map})
    //     })
    //     .catch(error => console.log(error))
    // }
    
    componentWillUnmount(){
        this.setState({
            data: null
        })
    }

    getStatus(data){
        if(data === "0"){
           var status = <h5><span className="badge badge-danger text-white">{this.lang.payment_unpaid}</span></h5>
        } else if( data === 'pending' || data === 'settlement'){
            var status = <h5><span className="badge badge-danger text-white">{this.lang.waiting_payment}</span></h5>
        } else if(data === 'success' || data === 'capture') {
            var status = <h5><span className="badge badge-danger text-white">{this.lang.payment_success}</span></h5>
        } else if(data === 'deny' || data === 'failed'){
            var status = <h5><span className="badge badge-danger text-white">{this.lang.payment_failed}</span></h5>
        } else if(data === 'expire'){
            var status = <h5><span className="badge badge-danger text-white">{this.lang.payment_expired}</span></h5>
        } else if(data === 'refund'){
            var status = <h5><span className="badge badge-danger text-white">{this.lang.refund_success}</span></h5>
        }
        return status
    }

	render() {           
		return (
            <div className="vendorHome">
                <div className="row">
                    <div className="col-md-4 col-sm-6 px-2">
                        <div className="card bg-white mb-3">
                            <div className="card-header pb-0 bg-transparent border-0 bg-icon">
                                Order Hari ini
                                <hr/>
                            </div>
                            <div className="card-body">
                                <h2 className="card-title">Rp 10.000.000</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 px-2">
                        <div className="card bg-white mb-3">
                            <div className="card-header pb-0 bg-transparent border-0 bg-icon">
                                Income Today
                                <hr/>
                            </div>
                            <div className="card-body bg-icon">
                                <h2 className="card-title">Rp 10.000.000</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 px-2">
                        <div className="card bg-white mb-3">
                            <div className="card-header pb-0 bg-transparent border-0 bg-icon">
                                Total Withdrawal
                                <hr/>
                            </div>
                            <div className="card-body bg-icon">
                                <h2 className="card-title">Rp 10.000.000</h2>
                            </div>
                         </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 px-2">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link bg-transparent active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Ringkasan Penjualan</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link bg-transparent" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Ringkasan Transaksi</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <CDashRingkasanPenjualan data={this.state.alltrans} searchKey={"product"}/>
                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <CDashRingkasanTransaksi data={this.state.paid} searchKey={"product"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		)
	}
}

export default CHome
