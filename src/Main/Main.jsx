import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Routing from "./Routing/Routing";
import logo from "./Components/Public/img/logo_sticky.png";
import "./Main.css";
import Translations from "./../localization/translations.js";
import LocalizedStrings from "react-localization";
import AccessControl from "./../_config/middleware/AccessControl";
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navBar: true,
            sideBar: false,
            mobile: false
        };

        this.AccessControl = new AccessControl();
        this.handleClick = this.handleClick.bind(this);
        this.handleClickSideBar = this.handleClickSideBar.bind(this);

        //Get Translations
        this.Translations = new Translations();
        var translate = this.Translations.locale();
        this.lang = new LocalizedStrings({ translate });

        // Binding
        this.detectDevice = this.detectDevice.bind(this);
        this.renderMainNavBar = this.renderMainNavBar.bind(this);
        this.renderMobileMainNavBar = this.renderMobileMainNavBar.bind(this);
        this.renderMain = this.renderMain.bind(this);
    }

    componentDidMount() {
        if (!isMobile) {
            window.onscroll = function () {
                var currentScrollPos = window.pageYOffset;
                if (currentScrollPos > 50) {
                    document.getElementById("navbar").style.top = "-55px";
                } else {
                    document.getElementById("navbar").style.top = "0px";
                }
            };
        }
    }

    loginCheck() {
        return this.AccessControl.loggedIn();
    }

    user() {
        return this.AccessControl.user();
    }

    navBarUser() {
        let navbar = ""
        if (this.loginCheck() == 'user') {
            navbar = (
                <div className="dropdown-menu mt-2" aria-labelledby="navbarDropdownMenuLink">
                    <a className="dropdown-item" href={process.env.REACT_APP_USER + "dash"}> Akun Saya </a>
                    <a className="dropdown-item" href={process.env.REACT_APP_USER + "booking"}> Pesanan Saya </a>
                    <a className="dropdown-item" href={process.env.PUBLIC_URL} onClick={this.handleClickSignOut} > Logout </a>
                </div>)
        } else if (this.loginCheck() == 'partner') {
            navbar = (
                <div className="dropdown-menu mt-2" aria-labelledby="navbarDropdownMenuLink">
                    <a className="dropdown-item" href={process.env.REACT_APP_VENDOR }> Dashboard </a>
                    <a className="dropdown-item" href={process.env.REACT_APP_VENDOR + "product"}> Produk Saya </a>
                    <a className="dropdown-item" href={process.env.PUBLIC_URL} onClick={this.handleClickSignOut} > Logout </a>
                </div>)
        }
        return (navbar)
    }

    handleClick() {
        this.setState(state => ({
            navBar: !state.navBar
        }));
    }

    handleClickSideBar() {
        this.setState(state => ({
            sideBar: !state.sideBar
        }));
    }

    handleClickSignOut() {
        localStorage.removeItem('travnesia_loggedin');
    }

    renderMainNavBar() {
        if (this.loginCheck()) {
            return (
                <div className="fixed-top bg-white shadow-sm" id="navbar">
                    <div className="container">
                        <div className="row justify-content-center py-2">
                            <div className="col-md-12">
                                <div className="clearfix">
                                    <div className="float-left">
                                        <Link to="/">
                                            <img
                                                src={logo}
                                                style={{height:40+"px", width:194+"px"}}
                                                alt="Tripdize"
                                                className="brand-logo ml-2"
                                            />
                                        </Link>
                                    </div>

                                    <ul className="nav justify-content-end list-additional">
                                        <li className="nav-item dropdown pl-1">
                                            <a
                                                className="nav-link dropdown-toggle f-fourth-color"
                                                href="#"
                                                id="navbarDropdown"
                                                role="button"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                ID
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <a className="dropdown-item" href="#"> US </a>
                                                <a className="dropdown-item" href="#"> United Arab </a>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div className="nav-link">
                                                <Link to="/travel">
                                                    <span>
                                                        <i className="fa fa-headphones f-fourth-color" />
                                                    </span>
                                                    {this.lang.bantuan}
                                                </Link>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div className="nav-link">
                                                <Link to="/travel">Pembayaran</Link>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav className="navbar navbar-expand-lg">
                        <div className="container">
                            <div
                                className="collapse navbar-collapse"
                                id="navbarSupportedContent"
                            >
                                <ul className="nav navbar-nav">
                                    <li className="nav-item">
                                        <div className="nav-link">
                                            <span>
                                                <i className="fa fa-plane fa-fw mr-1 text-info" />
                                            </span>
                                            <Link to="/travel">Cari Travel</Link>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div className="nav-link">
                                            <span>
                                                {/* <i className="fa fa-passport fa-fw mr-1 text-primary" /> */}
                                                <i className="fa fa-map text-warning"></i>
                                            </span>
                                            <a href="/travel?category=backpacker">Backpacker</a>
                                        </div>
                                    </li>
                                    {/* <li className="nav-item">
                                        <div className="nav-a">
                                            <span>
                                                <i className="fa fa-ticket fa-fw mr-1 text-warning" />
                                            </span>
                                            <Link to="/tiket">Tiket Konser</Link>
                                        </div>
                                    </li> */}
                                    <li className="nav-item">
                                        <div className="nav-link">
                                            <span>
                                                <i className="fa fa-heart fa-fw mr-1 text-danger" />
                                            </span>
                                            <a href={"/travel?category=honeymoon"}>Paket Bulan Madu</a>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div className="nav-link">
                                            <span>
                                                <i className="fa fa-car fa-fw mr-1 text-success" />
                                            </span>
                                            <a href={"/travel?category=family"}>Paket Keluarga</a>
                                        </div>
                                    </li>
                                </ul>
                                <ul className="nav navbar-nav ml-auto ">
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle f-white btn btn-sm btn-travnesia"
                                            href="#"
                                            id="navbarDropdownMenuLink"
                                            role="button"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false" >
                                            <span>
                                                <i className="fa fa-user float-left mr-2 p-1" />
                                            </span>
                                            {this.user()}
                                        </a>
                                       {this.navBarUser()}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            );
        } else {
            return (
                <div className="fixed-top bg-white shadow-sm" id="navbar">
                    <div className="container">
                        <div className="row justify-content-center py-2">
                            <div className="col-md-12">
                                <div className="clearfix">
                                    <div className="float-left">
                                        <Link to="/">
                                            <img
                                                src={logo}
                                                alt="Tripdize"
                                                className="brand-logo ml-2"
                                            />
                                        </Link>
                                    </div>

                                    <ul className="nav justify-content-end">
                                        <li className="nav-item dropdown pl-1">
                                            <a
                                                className="nav-link dropdown-toggle f-fourth-color"
                                                href="#"
                                                id="navbarDropdown"
                                                role="button"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            > ID </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown" >
                                                <a className="dropdown-item" href="#"> US </a>
                                                <a className="dropdown-item" href="#"> United Arab </a>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div className="nav-link">
                                                <Link to="/travel">
                                                    <span>
                                                        <i className="fa fa-headphones f-fourth-color" />
                                                    </span>
                                                    Bantuan
                                                </Link>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div className="nav-link">
                                                <Link to="/travel">Pembayaran</Link>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav className="navbar navbar-expand-lg">
                        <div className="container">
                            <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                                <ul className="nav navbar-nav">
                                    <li className="nav-item">
                                        <div className="nav-link">
                                            <span>
                                                <i className="fa fa-plane fa-fw mr-1 text-info" />
                                            </span>
                                            <Link to="/travel">Cari Travel</Link>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div className="nav-link">
                                            <span>
                                                {/* <i className="fa fa-passport fa-fw mr-1 text-primary" /> */}
                                                <i className="fa fa-map text-warning"></i>
                                            </span>
                                            <a href={"/travel?category=backpacker"}>Backpacker</a>
                                        </div>
                                    </li>
                                    {/* <li className="nav-item">
                                        <div className="nav-link">
                                            <span>
                                                <i className="fa fa-ticket fa-fw mr-1 text-warning" />
                                            </span>
                                            <Link to="/tiket">Tiket Konser</Link>
                                        </div>
                                    </li> */}
                                    <li className="nav-item">
                                        <div className="nav-link">
                                            <span>
                                                <i className="fa fa-heart fa-fw mr-1 text-danger" />
                                            </span>
                                            <a href={"/travel?category=honeymoon"}>Paket Bulan Madu</a>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div className="nav-link">
                                            <span>
                                                <i className="fa fa-car fa-fw mr-1 text-success" />
                                            </span>
                                            <a href="/travel?category=family">Paket Keluarga</a>
                                        </div>
                                    </li>
                                </ul>
                                <ul className="nav navbar-nav ml-auto ">
                                    <li className="nav-item">
                                        <div className="nav-link f-primary-color">
                                            <Link to="/signin">Sign In</Link>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div className="nav-link f-white btn btn-warning pl-4 pr-4">
                                            <Link to="/signup">Register</Link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            );
        }
    }

    renderMobileMainNavBar() {
        if (this.loginCheck()) {
            return (
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
                                onClick={e => this.handleClickSideBar()}
                            >
                                <i className="fa fa-ellipsis-v fa-fw f-primary-color" />
                                <span className="" />
                            </button>
                        </div>
                    </div>
                </nav>
            );
        } else {
            return (
                <nav className="navbar navbar-expand-lg fixed-top">
                    <div className="row">
                        <div className="col-6">
                            <a href="/">
                                <img src={logo} className="logo-header" />
                            </a>
                        </div>
                        <div className="col-6 margin-bar">
                            <button
                                type="button"
                                id="sidebarCollapse"
                                className="btn float-right bar-menu"
                                onClick={e => this.handleClickSideBar()}
                            >
                                <i className="fa fa-ellipsis-v fa-fw f-primary-color" />
                                <span className="" />
                            </button>
                        </div>
                    </div>
                </nav>
            );
        }
    }


    detectDevice() {
        if (!isMobile) {
            return this.renderMainNavBar();
        }
    }

    renderMain() {
        return (
            <div>
                <div id="content-wrapper">
                    {this.detectDevice()}
                    <div id="main-content">
                        <Routing />
                    </div>
                </div>
                <div
                    className={this.state.sideBar ? "overlay active" : "overlay"}
                    onClick={this.handleClickSideBar}
                />
            </div>
        );
    }

    render() {
        return (
            <div>
                <Router>{this.renderMain()}</Router>
            </div>
        );
    }
}

export default Main;
