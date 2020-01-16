import React,{Component} from "react"
import CRating from '../../Components/Public/cRating'
import './style/sHistory.css'
import orderList from '../../../_services/customers/OrderService'

class CHistory extends Component{

    constructor (props){
        super(props)
        this.state = {
            data :[]
        }

        //backend
        this.orderList = new orderList()
        this.getFacilities = this.getFacilities.bind(this)
        
    }

    componentDidMount(){
        this.orderList.getHistory()
        .then(res => {
            let data_map = res.result.map(data =>{
                return data
            })
            this.setState({data : data_map})
        })
        .catch(error => console.log(error))
        
    }

    //function to get facilities
    getFacilities(data_map) {
        var array = []
        var facilities = data_map.split(",")
        for (let i=0;i<facilities.length;i++){
            if (facilities[i].includes('hotel')){
                array.push(
                    <span className='badge badge-danger p-1 mr-1' key={i} >
                        <i className='fa fa-bed' />
                    </span>
                )
            } else if (facilities[i].includes('transportation')){
                array.push(
                    <span className='badge badge-danger p-1 mr-1' key={i}>
                      <i className='fa fa-bus' />
                    </span>
                )
            } else if(facilities[i].includes('meals')){
                array.push(
                    <span className='badge badge-danger p-1 mr-1' key={i}>
                        <i className='fa fa-cutlery' />
                     </span>
                )
            } else {
                array.push(
                <span className='badge badge-danger p-1 mr-1' key={i}>
                    <i className='fa fa-credit-card' />
                </span>)
            }
        } 
        return array
    } 

    //currency total amount 
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

       
    render(){
        if(this.state.data == ''){
            return (
                <div className="cUserHistory">
                <div className="page-heading pb-4">
                    <h5>History List</h5>
                </div>
                <div className="alert alert-warning">
                    <strong>Oops!</strong> Tidak ada Transaksi.
                </div>
                </div>
            )
        } else {
            return(
                <div className="cUserHistory">
                    <div className="page-heading pb-4">
                        <h5>History List</h5>
                    </div>
                    <div className="row">
                        <div className="col-md-6 pr-0">
                            {this.state.data.map((data_map, i) => {
                                return(
                                    <div className="media mb-4 shadow-sm" key={i}> 
                                        <div className='media-body p-3 bg-white rounded'>
                                            <div className='row' >
                                                <div className='col-6'>
                                                    <a href={'/payment/product?order_id=' + data_map.orderId} target="_blank"><h5>{data_map.package_name}</h5></a>
                                                    <h6>By {data_map.vendor.companyname}</h6>
                                                    <span className='d-block'>
                                                        <i className='fa fa-star' />
                                                        <i className='fa fa-star' />
                                                        <i className='fa fa-star' />
                                                        <i className='fa fa-star' />
                                                        <i className='fa fa-star' />
                                                    </span>
                                                    <p>
                                                        { 
                                                            this.getFacilities(data_map.facilities)
                                                        }
                                                        <span className='badge badge-danger p-1 mr-1'>
                                                            <i>{data_map.duration}</i>
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className='col-6'>
                                                    <span>
                                                        <i className='fa fa-suitcase fa-fw text-primary d-inline ' />
                                                        <h6 className="ml-2 d-inline">{data_map.qty}</h6>
                                                    </span>
                                                    <br/>
                                                    <span>
                                                        <i className='fa fa-money fa-fw d-inline text-success' />
                                                        <h6 className='f-fourth-color d-inline ml-2'>Rp {this.formatCurrency(data_map.total)}</h6>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        
                        </div>
                    </div>
                </div>
            );
        }
        
    }
}

export default CHistory;