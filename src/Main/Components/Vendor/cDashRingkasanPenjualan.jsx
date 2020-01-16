import React,{Component} from "react"


class CDashRingkasanPenjualan extends Component{
    constructor(props){
        super(props);
        this.state = {
            alltrans : [],
            data : [],
            dataFromProps : []
        }

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentWillReceiveProps(nextProps){
        this.setState({data : nextProps.data})
        this.setState({dataFromProps : nextProps.data})
    }

    async handleInputChange(el){
        var keyword = el.target.value
        var result = []
        if(keyword===''){
            this.setState({data : this.state.dataFromProps})
        }
        else{
            this.state.data.filter(map => {
                if(map.product.toUpperCase().search(keyword.toUpperCase())!== -1){
                    result = [...result, map]
                }
            })
            this.setState({data:result})
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
        } else if(data === 'expire' || data === 'expired'){
            return (<h5><span className="badge badge-danger text-white">Pembayaran Expired</span></h5>)
        } else if(data === 'refund'){
            return (<h5><span className="badge badge-danger text-white">Pembayaran Sukses</span></h5>)
        } else if(data === 'cancel'){
            return (<h5><span className="badge badge-danger text-white">Pesanan Dibatalkan</span></h5>)
        } else {
            return (<h5><span className="badge badge-danger text-white">Error</span></h5>)
        }
    }

    render(){
        return(
            <div>
                <div className="row justify-content-end mb-3">
                    <div className="col-md-4">
                        <div className="">
                        <input type="text" onChange={(e) => { this.handleInputChange(e) }} className='form-control' placeholder="Search"/> 
                        </div>
                    </div>
                </div>
                {this.state.data.map((alltrans, i)=>{
                    return(
                        <div className="card bg-white mb-2" key={i}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3 col-6">
                                        <h6 className="text-muted">{alltrans.order_id}</h6>
                                        <h5>{alltrans.product}</h5>
                                        <p className="text-muted">{alltrans.date}</p>
                                    </div>
                                    <div className="col-md-3 col-6">
                                        <h6 className="text-muted">Total Tagihan</h6>
                                        <h5>Rp {this.formatCurrency(alltrans.total)}</h5>
                                    </div>
                                    <div className="col-md-3">
                                        <h6 className="text-muted">Status Tagihan</h6>
                                        {/* <h5><span className="badge badge-danger text-white">Belum Dibayarkan</span></h5> */}
                                        {this.getStatus(alltrans.status)}
                                    </div>
                                    <div className="col-md-3">
                                        <a href={"/partner/product/detail/" + alltrans.slug} className="btn btn-sm btn-outline-info rounded-0 btn-block">
                                            <i className='fa fa-eye float-left mt-1'></i>
                                            Lihat Detail</a>
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

export default CDashRingkasanPenjualan;