import React,{Component} from "react"
import VendorDetail from './../../../_services/vendor/VendorDetail'
import Alert from './../../../_services/alert/Alert'
import { confirmAlert } from 'react-confirm-alert'

class CDataTableOnPromotePackage extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : []
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.Product = new VendorDetail()
        this.Alert = new Alert()
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

    deleteProduct(slug, i){
        return confirmAlert({
            title : 'Delete',
            message : 'apakah anda yakin menghapusnya??',
            buttons : [
                {
                    label : 'Yes',
                    onClick:() => {
                        this.Product.deleteProduct(slug)
                        .then(res =>{
                            this.sliceArray(i)
                            this.Alert.success('Sukses', 'Berhasil menghapus paket')
                        }).catch(error=>{
                            console.log(error)
                            this.Alert.error('Gagal', 'Gagal menghapus paket')
                        })
                    }
                },
                {
                    label : "No"
                }
            ]
        })
    }

    sliceArray(i){
        let data = this.state.data
        data.splice(i,1)
        console.log(i)
        console.log(data)
        this.setState({
            data : data
        })
    }

     formatCurrency(amount, decimalCount = 2, decimal = ".", thousands = ",") {
        try {
          decimalCount = Math.abs(decimalCount);
          decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

          const negativeSign = amount < 0 ? "-" : "";

          let i = parseInt(
            (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
          ).toString();
          let j = i.length > 3 ? i.length % 3 : 0;

          return (
            negativeSign +
            (j ? i.substr(0, j) + thousands : "") +
            i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
            (decimalCount
              ? decimal +
              Math.abs(amount - i)
                .toFixed(decimalCount)
                .slice(2)
              : "")
          );
        } catch (e) {
          return null;
        }
      }

    goToCreatePackage() {
        window.location = process.env.PUBLIC_URL + 'partner/product/add'
    }




    render(){
        return(
            <div>
                <div className="row justify-content-end mb-3">
                    <div className='col-md-8 mb-3'>
                        <button onClick={()=>this.goToCreatePackage()} className='btn btn-danger'>
                            <i className='fa fa-plus float-left mt-1 mr-2'></i>
                            Add New Package</button>
                    </div>
                    <div className="col-md-4">
                        <div className="">
                        <input type="text" onChange={(e) => { this.handleInputChange(e) }} className='form-control' placeholder="Search"/> 
                        </div>
                    </div>
                </div>
                {this.props.data.map((data_map, i) => {
                    return(
                         <div className="card bg-white mb-2" key={i}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3 col-6">
                                        <h6 className="text-muted">ID : {data_map.product_id}</h6>
                                        <h5>{data_map.name}</h5>
                                        <p className="text-muted">Hits : {data_map.hits}</p>
                                    </div>
                                    <div className="col-md-3 col-6">
                                        <h6 className="text-muted">Base Price</h6>
                                        <h5>Rp. {this.formatCurrency(data_map.base_price)}</h5>
                                    </div>
                                    <div className="col-md-3">
                                        <h6 className="text-muted">Status</h6>
                                        <h5><span className="badge badge-warning text-white">On Promote</span></h5>
                                    </div>
                                    <div className="col-md-3">
                                        <a href={"/partner/product/detail/"+ data_map.slug} className="btn btn-sm btn-outline-info rounded-0 btn-block">
                                            <i className='fa fa-eye float-left mt-1'></i>
                                            Lihat Detail</a>
                                        <a href="" className="btn btn-sm btn-outline-success rounded-0 btn-block">
                                            <i className='fa fa-plus-square float-left mt-1'></i>
                                            Add Sub Pacakage</a>
                                        <button onClick={() => {this.deleteProduct(data_map.slug, i)}} className='btn btn-sm btn-danger rounded-0 btn-block'>
                                            <i className='fa fa-trash float-left mt-1'></i>
                                            Delete</button>
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

export default CDataTableOnPromotePackage;