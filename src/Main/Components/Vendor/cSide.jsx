import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './style/sSide.css'

class CSide extends Component {
	constructor(props){
		super(props)
		this.state = {
			data : []
		}
	}

	render() {
		// console.log(this.state.data)
		const link = [
			{
				name: "Dashboard",
				icon: "fa fa-home fa-fw mr-2",
				link: "/partner"
			},
			{
				name: "My Company",
				icon: "fa fa-user fa-fw mr-2",
				link: "/partner/profile"
			},
			{
				name: "My Product",
				icon: "fa fa-book fa-fw mr-2",
				link: "/partner/product"
			},
			{
				name: "My Transaction",
				icon: "fa fa-money fa-fw mr-2",
				link: "/partner/transaction"
			}
		];
		// console.log(this.props.data)
		return (
			<div className="vendor-left">
                <div className="vendor-logo mb-3 rounded justify-content-center">
                    <img src="https://scontent.fcgk18-1.fna.fbcdn.net/v/t1.0-9/28795474_579008002450320_5948081233064886272_o.jpg?_nc_cat=109&_nc_eui2=AeG4ePvszcrsDu5mt-TSfYhVeTnz49xhOxMEyUDLvkdsbMDV1ONTDmujT65bEIFT5kQDtna7crcLZqAtgkQVSyqs04JgjLsPLpvpLFrG2WRJTg&_nc_ht=scontent.fcgk18-1.fna&oh=54673ef0e44ce90037c3842ad3ee9b0c&oe=5D1EB80A" alt="Card image cap" />
                </div>
                	<h5 className="text-center mb-4">{this.props.data}</h5>
                <ul className="list-group list-group-flush">
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