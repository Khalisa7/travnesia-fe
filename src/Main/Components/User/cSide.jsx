import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './style/sSide.css'



class CSide extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const link = [
            {
                name: "Dashboard",
                icon: "fa fa-home fa-fw mr-2",
                link: "/user/dash"
            },
            {
                name: "My Profile",
                icon: "fa fa-user fa-fw mr-2",
                link: "/user/profile"
            },
            {
                name: "My Booking",
                icon: "fa fa-book fa-fw mr-2",
                link: "/user/booking"
            },
            {
                name: "My History",
                icon: "fa fa-history fa-fw mr-2",
                link: "/user/booking-history"
            }
        ];

        return (
            <div className="user-left">

                <ul className="list-group">
                    {link.map((data, i) => {
                        return (
                            <Link key={i} to={data.link} >
                                <li className={this.props.active == data.name ? "list-group-item border-0 rounded-0 active" : "list-group-item border-0 bg-transparent rounded-0"}>
                                    <span><i className={data.icon}></i></span>
                                    {data.name}</li>
                            </Link>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default CSide;