import React, { Component } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import './style/sCart.css'
import CartService from '../../../_services/customers/cart/CartService'
import axios from 'axios'
import AccessControl from '../../../_config/middleware/AccessControl'

class CCart extends Component {
    constructor (props) {
        super(props)
        this.removeTodo = this.removeTodo.bind(this)

        this.CartService = new CartService()
        this.getFacility = this.getFacility.bind(this)
        this.AccessControl = new AccessControl()
        this.state = {
            data: [],
            total: 0,
            text: '',
            addClass: false
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount () {
        if(this.AccessControl.loggedIn){
            this.fetchData()
        }
    }

    fetchData() {
        this.CartService.getCart()
            .then(results => {
                return results.json()
            })
            .then(res => {
                // console.log(res.result)
                let data_map = res.result.data.map(data => {
                    return data
                })
                let total = res.result.total

                this.setState({ 
                    data: data_map, 
                    total : total
                })
            }).catch(err => {return err})
    }

    refreshContent(){
        this.componentDidMount()
    }

    removeTodo (i, package_id, subpackage_id) {
        let data_slice = this.state.data
        data_slice.splice(i, 1)
        this.CartService.deleteItem(package_id, subpackage_id)
        this.setState({ data: data_slice })
        this.setState({addClass: true})
    }

    getFacility(data) {
        var array = []
        var facility = data.split(",")
        for (let i = 0; i < facility.length; i++) {
            if (facility[i].includes('hotel')) {
                array.push(
                    <span className='badge badge-danger p-1'>
                        <i className='fa fa-bed' />
                    </span>)
            } else if (facility[i].includes('transportation')) {
                array.push(
                    <span className='badge badge-danger p-1'>
                        <i className='fa fa-bus' />
                    </span>)
            } else if (facility[i].includes('meals')) {
                array.push(
                    <span className='badge badge-danger p-1'>
                        <i className='fa fa-cutlery' />
                    </span>)
            } else {
                array.push(
                    <span className='badge badge-danger p-1'>
                        <i className='fa fa-credit-card' />
                    </span>)
            }
        }
        return array
    }

    renderCart(){
        return (
            <div>
                {this.state.data.map((data_map, i) => {
                    return (
                        <div className={this.state.addClass ? 'media mb-4 shadow' : 'media mb-4 shadow fadeOutLeft'} key={i} >
                            <div className='media-img'>
                                <img src={process.env.REACT_APP_CDN_PRODUCT + data_map.product_details.image} alt='Generic placeholder image' />
                            </div>
                            <div className='media-body p-3 bg-white rounded'>
                                <div className='row'>
                                    <div className='col-8'>
                                        <h5>{data_map.product_details.name}</h5>
                                        <span className='d-block'>
                                            <i className='fa fa-star' />
                                            <i className='fa fa-star' />
                                            <i className='fa fa-star' />
                                            <i className='fa fa-star' />
                                            <i className='fa fa-star' />
                                        </span>
                                        <span>
                                            <i className='fa fa-money fa-fw d-inline' />
                                            &nbsp;Subtotal : 
                                            <h6 className='f-fourth-color d-inline ml-2'>Rp {this.CartService.formatRupiah(data_map.total_amount)}</h6>
                                        </span>
                                        <p>
                                            {this.getFacility(data_map.product_details.facility)}
                                            <span className='badge badge-danger p-1'>
                                                <i>{data_map.product_details.duration}</i>
                                            </span>
                                        </p>
                                    </div>
                                    <div className='col-4'>
                                        <button className='btn btn-warning btn-block btn-sm' onClick={(e) => { e.preventDefault(); this.removeTodo(i, data_map.product_id, data_map.subpackage_id) }}>Hapus</button>
                                    </div>
                                   <CTravelInputPack 
                                   date={this.CartService.formatDate(data_map.date_deparature)}
                                   count={data_map.qty} 
                                   product_id={data_map.product_id}
                                   subpackage_id={data_map.subpackage_id}
                                   status = {false}
                                   view = {this.refreshContent.bind(this)}
                                   />
                                </div>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        )
    }

    render () {
        return (
            <div>
                <div className='cart pt-4'>
                    <div className="container">
                        <div className='page-heading'>
                            <h5>Keranjang Belanja</h5>
                            <hr />
                        </div>
                        <form action=''>
                            <div className='row pt-2 justify-content-center'>
                                <div className='col-md-8'>
                                    {this.renderCart()}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <nav className='navbar fixed-bottom navbar-light white'>
                    <div className='container'>
                        <h2 className='navbar-brand f-primary-color float-right'><span>Total Di Keranjang : </span>Rp {this.CartService.formatRupiah(this.state.total)}</h2>
                        <ul className='nav navbar-nav ml-auto'>
                            <a href={process.env.PUBLIC_URL +'checkout'} className='btn btn-danger btn-block pl-5 pr-5'>
                                <span>
                                <i className='fa fa-cart-plus fa-fw pr-3' />
                                    Go To Checkout
                                </span>
                            </a>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

class CTravelInputPack extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.key,
            product_id: this.props.product_id,
            subpackage_id: this.props.subpackage_id,
            count : this.props.count,
            date : this.props.date
        }
        this.CartService = new CartService()
        this.CCart = new CCart()
        // this.handleDayChange = this.handleDayChange.bind(this)
    }

    increment(event) {
        this.setState({
            count: this.state.count + 1
          })
          this.updateData('inc')
    }

    decrement(event){
        if(this.state.count > 1){
           this.setState(prevState => ({count: prevState.count-1}))
        }
        this.updateData('dnc')
     }

    handleDayChange(selectedDay) {
        let date = this.CartService.formatDate(selectedDay)
        this.state.date = date
    }

    updateData(count) {
        let notasi = 0
        if (count == 'inc') {
            notasi = 1
        } else if (count == 'dnc') {
            notasi = -1
        }
        let product_id = this.state.product_id
        let subpackage_id = this.state.subpackage_id
        this.CartService.updateItem(product_id, subpackage_id, this.state.count + notasi, this.state.date)
        .then(res => {
            if(res.data.success){
                this.props.view()
            }
        }).catch(err => {return err})
    }
    render(){

        return (
            <div className='col-12' >
                <div className='form-row'>
                    <div className='form-group col-6'>
                        <label htmlFor=''>Tanggal Berangkat</label>
                        <DayPickerInput placeholder="Tanggal Berangkat" 
                        format={'YYYY-M-D'}
                        value={this.state.date} 
                        onDayChange={this.handleDayChange.bind(this)} 
                        />
                    </div>
                    <div className='form-group col-6'>
                        <label htmlFor=''>Input Pax</label>
                        <div className="count-pakage">
                            <div className="input-pack">
                                <button onClick={(e) => { e.preventDefault(); this.decrement(e) }} className="fa fa-minus count-pakageLeft btn btn-warning btn-sm"></button>
                                <input type="text" className="number counter form-inline" value={this.state.count} onChange={this.updateData.bind(this)}></input>
                                <button onClick={(e) => { e.preventDefault(); this.increment(e) }} className="fa fa-plus count-pakageRight btn btn-warning btn-sm"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CCart
