import React,{Component} from 'react'
import './style/sUserDashboard.css'
import OrderService from './../../../_services/customers/OrderService'
class CUserDashboard extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            booking:{
                order_number: '',
                date_booking: '',
                destination: '',
                grand_price: 0
            }
       
        }

        this.orderService = new OrderService()
    }

    componentDidMount(){
       this.getLastBooking()
    }

    getLastBooking(){
        this.orderService.getLastBooking()
        .then((resp)=>{
            console.log(resp)
            var booking = {...this.state.booking}
            booking.destination = resp.result[0].destination
            booking.order_number = resp.result[0].order_number
            booking.date_booking = resp.result[0].date_booking
            booking.grand_price = resp.result[0].total
            this.setState({booking})
        }).catch(err=>{
            console.log(err)
        })
    }

    formatDate(date) {
        let monthNames;
        monthNames = [
            "Januari", "Feburari", "Maret",
            "April", "Mei", "Juni", "Juli",
            "Agustus", "September", "Oktober",
            "November", "Desember"
        ];

        var getDate = new Date(date)
        var day = getDate.getDate()
        var monthIndex = getDate.getMonth()
        var year = getDate.getFullYear()
        return day + ' ' + monthNames[monthIndex] + ' ' + year
	}
    render(){
        let title = this.state.booking.destination
        return(
            <div className="user-dashboard">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card border-0 bg-white shadow mb-4">
                            <div className="card-header invoice">
                                <h4 className="text-white">My Booking</h4>
                                <p className="text-white">Your last booking was on <br/>{this.formatDate(this.state.booking.date_booking)}</p>
                            </div>
                            <div className="card-body">
                                <div className="media">
                                    <div className="media-body">
                                        <div className="clearfix">
                                            <h5 className="float-left">{title.slice(0,11) + (title.length > 11 ? "..." : "") }</h5>
                                            <a href={'/payment/product?order_id=' + this.state.booking.order_number} className="btn btn-sm btn-warning float-right">Pay Now</a>
                                        </div>
                                        <h6>Rp {this.state.booking.grand_price.toLocaleString()}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-md-12">
                        <div className="card border-0 bg-white shadow mb-4">
                            <div className="card-header booking">
                                <h4 className="text-danger">History Bookings</h4>
                                <p className="text-danger">Your last booking was on <br/>AUG 21 2017</p>
                            </div>
                            <div className="card-body"></div>
                        </div>
                    </div> */}
                    {/* <div className="col-md-12">
                        <div className="card border-0 bg-white shadow mb-4">
                            <div className="card-header point">
                                <h4 className="text-danger">Your Points</h4>
                                <p className="text-danger">Your total point <br/>AUG 21 2017</p>
                            </div>
                            <div className="card-body"></div>
                        </div>
                    </div> */}
                </div>
            </div>
        );
    }
}

export default CUserDashboard;