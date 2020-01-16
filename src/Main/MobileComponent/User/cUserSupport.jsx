import React,{Component} from 'react'
import './style/sUserSupport.css'
import botImage from './img/bot-icon.png'

class CUserSupport extends Component{
    render(){
        return(
            <div className="user-support">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card shadow border-0 mb-4">
                                    <div className="card-header bg-white">
                                        Your Ticket Status
                                    </div>
                                    <div className="card-body bg-white">
                                        <p>
                                            <span className="mr-4"><span className="badge badge-primary">0</span> Selesai</span>
                                            <span className="mr-4"><span className="badge badge-warning">0</span> Open</span>
                                            <span className="mr-4"><span className="badge badge-danger">0</span> Pending</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="card shadow border-0 mb-4">
                                    <div className="card-body bg-white">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="clearfix">
                                                    <div className="float-right">
                                                        <a href={process.env.PUBLIC_URL+'u/support/ticket/open'} className="btn btn-sm btn-danger">Open Ticket Support</a>
                                                    </div>
                                                </div>
                                                <div className="table-responsive mt-4">
                                                    <table className="table table-borderless table-sm">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" width="30%">Category</th>
                                                                <th scope="col" width="70%">Subject</th>
                                                                <th scope="col" width="10%">Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="media">
                                                                        <img src={botImage} alt="" className="rounded-circle mr-3" width="30px"/>
                                                                        <div className="media-body"><p>Support Production</p></div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <p>Sudah dibayar tapi masih pending</p>
                                                                </td>
                                                                <td>
                                                                    <span className="badge badge-primary">Selesai</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="media">
                                                                        <img src={botImage} alt="" className="rounded-circle mr-3" width="30px"/>
                                                                        <div className="media-body"><p>Support Production</p></div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <p>Sudah dibayar tapi masih pending Sudah dibayar tapi masih pending Sudah dibayar tapi masih pending</p>
                                                                </td>
                                                                <td>
                                                                    <span className="badge badge-danger">Pending</span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
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

export default CUserSupport