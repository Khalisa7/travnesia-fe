import React,{Component} from 'react';
import { Link } from "react-router-dom";
import Modal from 'react-responsive-modal';
import './style/sSupport.css'

class CSupport extends Component{
    constructor(props){
        super(props)
        this.state = {
            open:false
        }

        
        this.onOpenModal = this.onOpenModal.bind(this)
        this.handleClickEmail = this.handleClickEmail.bind(this)
    }

    onOpenModal(){
        this.setState({ open: true });
    };
    
    onCloseModal(){
        this.setState({ open: false });
    };
    
    handleClickEmail(e){
        console.log(e.target)
    }

    render(){
        return(
            <div className="userSupport">
                <div className="page-heading mb-4">
                    <div className="clearfix">
                        <h5 className="float-left">Support</h5>
                        <button className="float-right btn btn-danger" onClick={this.onOpenModal}>Open Ticket Support</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table">
                                    <tbody>
                                        <tr onClick={this.handleClickEmail}>
                                            <th width="20%"><Link to="/u/support/read" >Team Support</Link></th>
                                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec molestie</td>
                                            <td><i className="fa fa-paperclip float-right"></i></td>
                                            <th width="10%">25 Jan</th>
                                        </tr>
                                        <tr onClick={this.handleClickEmail}>
                                            <th width="20%"><Link to="/u/support/read" >Team Support</Link></th>
                                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec molestie</td>
                                            <td><i className="fa fa-paperclip float-right"></i></td>
                                            <th width="10%">25 Jan</th>
                                        </tr>
                                        <tr onClick={this.handleClickEmail}>
                                            <th width="20%"><Link to="/u/support/read" >Team Support</Link></th>
                                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec molestie</td>
                                            <td><i className="fa fa-paperclip float-right"></i></td>
                                            <th width="10%">25 Jan</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal open={this.state.open} onClose={()=>this.onCloseModal()}>
                    <div className="card rounded-0 border-0" style={{margin:-20, width:600+"px"}}>
                        <div className="card-header bg-primary py-4 rounded-0">
                            <h3 className="text-white">Open Ticket Support</h3>
                            <h6 className="text-white">Write Your Message For Us Here</h6>
                        </div>
                        <div className="card-body rounded-0 bg-white py-4">
                            <span>Nama :<h5>Herlina Sunaryanto</h5></span>
                            <span>Email :<h5>hs1998281@gmail.com</h5></span>
                            <form action="">
                                <div className="form-group pb-4">
                                <span>Apa Yang Bisa Kami Bantu ?</span>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="issues" value="option1" id="issues1" />
                                        <label className="form-check-label" htmlFor="issues1">
                                            Pertanyaan Umum
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="issues" value="option1" id="issues2" />
                                        <label className="form-check-label" htmlFor="issues2">
                                            Claim Voucher
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="issues" value="option1" id="issues3" />
                                        <label className="form-check-label" htmlFor="issues3">
                                            Pembatalan Paket
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="issues" value="option1" id="issues4" />
                                        <label className="form-check-label" htmlFor="issues4">
                                            Akun Saya
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="issues" value="option1" id="issues5" />
                                        <label className="form-check-label" htmlFor="issues5">
                                            Pembayaran
                                        </label>
                                    </div>
                                    <div className="form-group pt-2">
                                        <label htmlFor="issues">
                                            Siliahkan Masukkan Pertanyaan Anda
                                        </label>
                                        <textarea name="" id="" cols="30" rows="5" className="form-control"></textarea>
                                    </div>
                                </div>
                                <button className="btn btn-xs btn-danger btn-block">Submit Penilaian</button>
                            </form>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default CSupport