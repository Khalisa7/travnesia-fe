import React, { Component, Fragment } from 'react'
import axios from 'axios'

const colStyle = {
    marginTop: 100,
    marginBottom: 100,
};

export default class CUserConfirmMessage extends Component {
    constructor (props) {
        super(props)
        this.state = {
            resource: this.props.params.resource,
            hash: this.props.params.hash,
            success: 0,
            loading: true,
        }
    }

    componentDidMount() {
        axios({
            url: process.env.REACT_APP_ENDPOINT + 'user/confirmation_mail',
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            data: {
                'resource': this.state.resource,
                'hash': this.state.hash
            }
        })
        .then(res => {
            this.setState({success:1, loading:false})
        })
        .catch(err => this.setState({success:0, loading:false}))
    }

    render () {
        return (
            <Fragment>
                <div>
                    <div className="container">
                        <div class="row">
                            <div class="col-md-12" style={colStyle}>
                                <div class="row-title text-center">
                                    {this.state.loading && <h4>Loading...</h4>}
                                    {!this.state.loading && this.state.success == 1 &&
                                        <Fragment>
                                            <img className="mb-2" src="https://img.icons8.com/color/96/000000/ok.png" />
                                            <h1>Selamat</h1>
                                        </Fragment>
                                    }
                                    {!this.state.loading && this.state.success == 0 &&
                                        <Fragment>
                                            <img className="mb-2" src="https://img.icons8.com/color/96/000000/cancel.png" />
                                            <h1>Gagal</h1>
                                        </Fragment>
                                    }
                                </div>
                                <div class="row-subtitle text-center">
                                    {!this.state.loading && this.state.success == 1 &&
                                        <p>Email anda berhasil terverifikasi. Silahkan login.</p>
                                    }
                                    {!this.state.loading && this.state.success == 0 &&
                                        <p>Terjadi suatu Kesalahan.</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}