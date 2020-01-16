import React, { Component } from 'react'
import './style/sActivitiesCity.css'

import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import { isMobile, isBrowser } from "react-device-detect";


const options = {
    dots: false,
    className: "owl-theme",
    loop: true,
    nav: false,
    stagePadding: 20,
    responsive: {
        0: {
            items: 1
        },
        680: {
            items: 2
        },
        1024: {
            items: 4
        }
    }
}

export default class Activities extends Component {
    render() {
        return (
            <section className="activities-container">
                <div className="container owl-outer-container">
                    <div className=" justify-content-md-center">

                        <OwlCarousel
                            margin={10}
                            {...options}
                        >
                            <div className="item activity-child">
                                <a href="somewhere.com">
                                    <div className="card shadow">
                                        <img className="card-img-top" src="https://images.unsplash.com/photo-1485394735640-56c0356b62cf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjQ5Mjk2fQ" alt="Card image cap" />
                                        <div className="card-body">
                                            <li>
                                                {isMobile
                                                    ? <h5 className="card-title">Tiket Octo Sushi Dinner 1 Night Pass</h5>
                                                    : <h4 className="card-title">Tiket Octo Sushi Dinner 1 Night Pass</h4>
                                                }
                                            </li>
                                            <li>
                                                <span>
                                                    <i className="fa fa-star" />
                                                    4.8 &nbsp;
                                                </span>
                                                <span className="text-muted">
                                                    &nbsp;| 234K kali dipesan
                                                </span>
                                            </li>
                                            <li className="price">
                                                <span><b>Rp 889.302</b></span><br />
                                                <span className="text-grey card-price-desc">Tersedia dari tanggal 11 Januari 2019</span>
                                            </li>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="item activity-child">
                                <a href="somewhere.com">
                                    <div className="card shadow">
                                        <img className="card-img-top" src="https://images.unsplash.com/photo-1490677343801-763ce536dfb3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjQ5Mjk2fQ" alt="Card image cap" />
                                        <div className="card-body">
                                            <li>
                                                {isMobile
                                                    ? <h5 className="card-title">Tiket Octo Sushi Dinner 1 Night Pass</h5>
                                                    : <h4 className="card-title">Tiket Octo Sushi Dinner 1 Night Pass</h4>
                                                }
                                            </li>
                                            <li>
                                                <span>
                                                    <i className="fa fa-star" />
                                                    4.8 &nbsp;
                                                </span>
                                                <span className="text-muted">
                                                    &nbsp;| 234K kali dipesan
                                                </span>
                                            </li>
                                            <li className="price">
                                                <span><b>Rp 889.302</b></span><br />
                                                <span className="text-grey card-price-desc">Tersedia dari tanggal 11 Januari 2019</span>
                                            </li>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="item activity-child">
                                <a href="somewhere.com">
                                    <div className="card shadow">
                                        <img src="https://images.unsplash.com/photo-1542015119611-c6bf42e9bb7e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjQ5Mjk2fQ" alt="" className="card-img-top" />
                                        <div className="card-body">
                                            <li>
                                                {isMobile
                                                    ? <h5 className="card-title">Tiket Octo Sushi Dinner 1 Night Pass</h5>
                                                    : <h4 className="card-title">Tiket Octo Sushi Dinner 1 Night Pass</h4>
                                                }
                                            </li>
                                            <li>
                                                <span>
                                                    <i className="fa fa-star" />
                                                    4.8 &nbsp;
                                                </span>
                                                <span className="text-muted">
                                                    &nbsp;| 234K kali dipesan
                                                </span>
                                            </li>
                                            <li className="price">
                                                <span><b>Rp 889.302</b></span><br />
                                                <span className="text-grey card-price-desc">Tersedia dari tanggal 11 Januari 2019</span>
                                            </li>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="item activity-child">
                                <a href="somewhere.com">
                                    <div className="card shadow">
                                        <img src="https://images.unsplash.com/photo-1521734952068-852cfb00d46f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjQ5Mjk2fQ" alt="" className="card-img-top" />
                                        <div className="card-body">
                                            <li>
                                                {isMobile
                                                    ? <h5 className="card-title">Tiket Octo Sushi Dinner 1 Night Pass</h5>
                                                    : <h4 className="card-title">Tiket Octo Sushi Dinner 1 Night Pass</h4>
                                                }
                                            </li>
                                            <li>
                                                <span>
                                                    <i className="fa fa-star" />
                                                    4.8 &nbsp;
                                                </span>
                                                <span className="text-muted">
                                                    &nbsp;| 234K kali dipesan
                                                </span>
                                            </li>
                                            <li className="price">
                                                <span><b>Rp 889.302</b></span><br />
                                                <span className="text-grey card-price-desc">Tersedia dari tanggal 11 Januari 2019</span>
                                            </li>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </OwlCarousel>

                    </div>
                </div>
            </section>
        )
    }
}