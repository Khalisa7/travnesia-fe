import React,{Component} from "react"


class CDataTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : []
        }

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentDidMount(){
        this.setState({
            data : this.props.data
        })
    }

    handleInputChange(el){
        var keyword = el.target.value
        var lookFor = this.props.searchKey
        var result = []
        this.props.data.filter(data => {
            if(data[lookFor].toUpperCase().search(keyword.toUpperCase())!== -1){
                result = [...result, data]
            }
        })
        if(keyword.InputBrand === ''){
            this.setState({
                data : this.props.data
            })
        }
        else{
            this.setState({
                data : result
            })
        }
    }

    render(){
        return(
            <div>
                <div className="row justify-content-end mb-4">
                    <div className="col-md-4">
                        <input type="text" onChange={(e) => { this.handleInputChange(e) }} className='form-control' placeholder="Search"/>
                    </div>
                </div>
                {this.state.data.map((data_map, i)=>{
                    return(
                        <div className="card bg-white mb-2" key={i}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4 col-6">
                                        <h6 className="text-muted">Nomor Tagihan</h6>
                                        <h5>{data_map.DeviceName}</h5>
                                        <p className="text-muted">31 Desember 2018</p>
                                    </div>
                                    <div className="col-md-3 col-6">
                                        <h6 className="text-muted">Total Tagihan</h6>
                                        <h5>Rp 10.000.000</h5>
                                    </div>
                                    <div className="col-md-3">
                                        <h6 className="text-muted">Status Tagihan</h6>
                                        <h5><span className="badge badge-danger text-white">Belum Dibayarkan</span></h5>
                                    </div>
                                    <div className="col-md-2">
                                        <a href="" className="btn btn-outline-danger rounded-0 btn-block">Lihat Detail</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
        
}

export default CDataTable;