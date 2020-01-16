import React, { Component } from 'react';

class CIncome extends Component {
    render() {
        return (
            <div className='income'>
                <div className="card bg-white mb-2">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3 col-6">
                                <h6 className="text-muted">ID : 1243145325</h6>
                                <h5>Wisata jogja</h5>
                                <p className="text-muted">Hits : </p>
                            </div>
                            <div className="col-md-3 col-6">
                                <h6 className="text-muted">Base Price</h6>
                                <h5>Rp. 10.000.000</h5>
                            </div>
                            <div className="col-md-3">
                                <h6 className="text-muted">Status</h6>
                                <h5><span className="badge badge-success text-white">Active</span></h5>
                            </div>
                            <div className="col-md-3">
                                <a href="" className="btn btn-sm btn-outline-info rounded-0 btn-block">
                                    <i className='fa fa-eye float-left mt-1'></i>
                                    Lihat Detail</a>
                                <a href="" className="btn btn-sm btn-outline-success rounded-0 btn-block">
                                    <i className='fa fa-plus-square float-left mt-1'></i>
                                    Add Sub Pacakage</a>
                                <button className='btn btn-sm btn-danger rounded-0 btn-block'>
                                    <i className='fa fa-trash float-left mt-1'></i>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CIncome;