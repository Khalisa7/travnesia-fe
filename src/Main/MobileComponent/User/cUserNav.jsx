import React,{Component} from 'react'
import './style/sUserNav.css'

class CUserNav extends Component{
    constructor(props){
        super(props);
        this.state = {
            mobile : false
        }
    }

    render(){
        return(
            <div className="user-nav">
                <div className="card border-0 bg-white shadow mb-4 rounded-top">
                    <div className="card-body rounded-top">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link" href={process.env.PUBLIC_URL+'dash'}><i className="fa fa-home fa-fw pr-4"></i>Dashboard</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={process.env.PUBLIC_URL+'booking-history'}><i className="fa fa-bookmark fa-fw pr-4"></i>My Booking</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={process.env.PUBLIC_URL+'history'}><i className="fa fa-book fa-fw pr-4"></i>History Booking</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={process.env.PUBLIC_URL+'support'}><i className="fa fa-phone fa-fw pr-4"></i>Support</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default CUserNav