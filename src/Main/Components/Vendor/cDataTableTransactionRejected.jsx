import React,{Component} from "react"

class CDataTableTransactionRejected extends Component{
    constructor(props){
        super(props);
        this.state = {
            rejected : []
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

    formatCurrency(amount, decimalCount = 2, decimal = ',', thousands = ','){
        try{
            decimalCount = Math.abs(decimalCount)
            decimalCount = isNaN(decimalCount) ? 2: decimalCount

            const negativeSign = amount<0 ? '-' : ''

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString()
            let j = (i.length>3) ? i.length % 3 : 0

            return negativeSign + (j ? i.substr(0,j)+ thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands)+(decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2):'')
        } catch(e){
            console.log(e)
        }
    }

    getStatus(data){
        if(data === "0"){
           return (<h5><span className="badge badge-danger text-white">Belum Terbayar</span></h5>)
        } else if( data === 'pending' || data === 'settlement'){
            return (<h5><span className="badge badge-danger text-white">Menunggu Pembayaran</span></h5>)
        } else if(data === 'success' || data === 'capture') {
            return (<h5><span className="badge badge-danger text-white">Pembayaran Sukses</span></h5>)
        } else if(data === 'deny' || data === 'failed'){
            return (<h5><span className="badge badge-danger text-white">Pembayaran Gagal</span></h5>)
        } else if(data === 'expire'){
            return (<h5><span className="badge badge-danger text-white">Pembayaran Expired</span></h5>)
        } else if(data === 'refund'){
            return (<h5><span className="badge badge-danger text-white">Pembayaran Sukses</span></h5>)
        }
    }

    render(){
        if(this.props.data == ''){
            return (
                <div className="alert alert-warning">
                    <strong>Oops!</strong> Tidak ada Transaksi.
                </div>
            )
        } else {
        return(
            <div>
                <div className="row justify-content-end mb-4">
                    <div className="col-md-4">
                        <input type="text" onChange={(e) => { this.handleInputChange(e) }} className='form-control' placeholder="Search"/>
                    </div>
                </div>
                {this.props.data.map((rejected, i)=>{
                    return(
                        <div className="card bg-white mb-2" key={i}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4 col-6">
                                        <h6 className="text-muted">{rejected.order_id}</h6>
                                        <h5>{rejected.product}</h5>
                                        <p className="text-muted">{rejected.date}</p>
                                    </div>
                                    <div className="col-md-3 col-6">
                                        <h6 className="text-muted">Total Tagihan</h6>
                                        <h5>Rp {this.formatCurrency(rejected.total)}</h5>
                                    </div>
                                    <div className="col-md-3">
                                        <h6 className="text-muted">Status Tagihan</h6>
                                        {/* <h5><span className="badge badge-danger text-white">Belum Dibayarkan</span></h5> */}
                                        {this.getStatus(rejected.status)}
                                    </div>
                                    <div className="col-md-2">
                                        <a href="/partner/product/detail" className="btn btn-outline-danger rounded-0 btn-block">Lihat Detail</a>
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
        
}

export default CDataTableTransactionRejected;