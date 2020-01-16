import React, { Component } from 'react';
import './style/sMobileNavbar.css'
import logo from '../../Components/Public/img/logo_sticky.png'
import Translations from "../../../localization/translations";
import LocalizedStrings from "react-localization";
import { BrowserRouter as Router, Link } from "react-router-dom";

class MNavbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            sideBar : false
        }

        //Get Translations
        this.Translations = new Translations();
        var translate = this.Translations.locale();
        this.lang = new LocalizedStrings({ translate });
        this.handleClickSideBar = this.handleClickSideBar.bind(this);
        // this.sideBar = this.sideBar.bind(this)
    }

    handleClickSideBar(){
        this.setState({
            sideBar : !this.state.sideBar
        })
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg fixed-top">
                    <div className="row">
                        <div className="col-6">
                            <Link to="/">
                                <img src={logo} className="logo-header" />
                            </Link>
                        </div>
                        <div className="col-6 margin-bar">
                            <button
                                type="button"
                                id="sidebarCollapse"
                                className="btn float-right bar-menu"
                                onClick={this.handleClickSideBar}
                            >
                                <i className="fa fa-ellipsis-v fa-fw f-primary-color" />
                                <span className="" />
                            </button>
                        </div>
                    </div>
                </nav>
                

                <div>
                    <div className="overlay" />
                    <nav id="sidebar" className={this.state.sideBar ? "active" : null}>
                        <div className="sidebar-header">
                            <img src={logo} alt="" className="brand-logo" />
                        </div>
                        <div id="dismiss" onClick={this.handleClickSideBar}>
                            <i className="fa fa-arrow-right" />
                        </div>
                        <ul className="list-unstyled components">
                            <li>
                                <Link to="/">
                                    {" "}
                                    <i className="fa fa-flag fa-fw mr-2 f-primary-color" />
                                    {this.lang.bahasa}
                                </Link>
                            </li>
                            <li>
                                <Link to="/travel">
                                    {" "}
                                    <i className="fa fa-headphones fa-fw mr-2 f-primary-color" />
                                    {this.lang.bantuan}
                                </Link>
                            </li>
                            <li>
                                <Link to="/tiket">
                                    {" "}
                                    <i className="fa fa-money fa-fw mr-2 f-primary-color" />
                                    {this.lang.payment}
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup">
                                    {" "}
                                    <i className="fa fa-shopping-cart fa-fw mr-2 f-primary-color" />
                                    {this.lang.my_cart}
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup" > <i className='fa fa-sign-out fa-fw mr-2 f-primary-color' />Sign Out</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

export default MNavbar;