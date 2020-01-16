import React, { Component } from "react"

import { Link } from "react-router-dom"
import "./style/sTransaction.css"
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import HomeManifest from '../../../_services/home/HomeManifest.js'
import Translations from '../../../localization/translations.js'
import LocalizedStrings from 'react-localization'
import Cookies from 'universal-cookie';
import CDataTableTransactionIncoming from './cDataTableTransactionIncoming'
import CDataTableTransactionRejected from './cDataTableTransactionRejected'
import CDataTableTransactionAccepted from './cDataTableTransactionAccepted'
import deviceList from './file.json'
import orderService from '../../../_services/vendor/transactionService'
const cookies = new Cookies();


class CVendorTransaction extends Component{

    constructor(){
        super()
        this.state = {
            accepted : [],
            rejected : [],
            pending : []
        }

        this.orderService = new orderService()
    }

    componentDidMount() {
        
        this.orderService.getTransaction()
        .then(res => {
            let pending = []
            let accepted = []
            let rejected = []

            res.result.map((data) => {
                if((data.status == 'success' || data.status == 'capture') && data.approvement == 0){
                    pending.push(data)
                } else if(data.approvement == 1){
                    accepted.push(data)
                } else if(data.approvement == 2){
                    rejected.push(data)
                }
            })

            this.setState({ accepted : accepted })
            this.setState({ pending : pending})
            this.setState({ rejected : rejected})
        })
        .catch(error => console.log(error))
    }


    render() {
        // console.log(pending)
        return (
            <div className="transaction">
                <div className="row">
                    <div className="col-md-4 col-sm-6 px-2">
                        <div className="card bg-white mb-3">
                            <div className="card-header pb-0 bg-transparent border-0 bg-icon">
                            Total Revenue
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
                        <ul className="nav nav-tab">
                            <li className="nav-item">
                                <a className="nav-link active" id="TIncoming-tab" data-toggle="tab" href="#TIncoming" role="tab" aria-controls="TIncoming" aria-selected="true">Transaction Incoming</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="TAccepted-tab" data-toggle="tab" href="#TAccepted" role="tab" aria-controls="TAccepted" aria-selected="false">Transaction Accepted</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="TRejected-tab" data-toggle="tab" href="#TRejected" role="tab" aria-controls="TRejected" aria-selected="false">Transaction Rejected</a>
                            </li>
                        </ul>

                        <div className="tab-content" id="TabContent">
                            <div className="tab-pane fade show active" id="TIncoming" role="tabpanel" aria-labelledby="TIncoming-tab">
                                <CDataTableTransactionIncoming data={this.state.pending} searchKey={"DeviceName"}  />
                            </div>
                            <div className="tab-pane fade" id="TAccepted" role="tabpanel" aria-labelledby="TAccepted-tab">
                                <CDataTableTransactionAccepted data={this.state.accepted} searchKey={"DeviceName"}  />
                            </div>
                            <div className="tab-pane fade" id="TRejected" role="tabpanel" aria-labelledby="TRejected-tab">
                                <CDataTableTransactionRejected data={this.state.rejected} searchKey={"DeviceName"}  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        )
    }
}
export default CVendorTransaction;


