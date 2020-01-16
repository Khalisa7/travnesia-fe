import React, { Component } from "react";
import {Link} from "react-router-dom"

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import HomeManifest from "../../../_services/home/HomeManifest.js";
import Translations from "../../../localization/translations.js";
import LocalizedStrings from "react-localization";
import "./style/sTopPackage.css";
import ContentLoader from "./../../ContentLoader/DesktopView/PopularPackageLoader";


class CTopPackacge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.Manifest = new HomeManifest();
        this.Translations = new Translations();
        var Locale = this.Translations.locale();
        this.lang = new LocalizedStrings({ Locale });
    }

    componentDidMount() {
        this.Manifest.popularTravelProduct()
        .then(res => {
            let data_map = res.result.map(data => {
            return data;
            });
            this.setState({ data: data_map });
        })
        .catch(err => {
            console.log(err);
        });
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
            console.log(e);
        }
    }


    render() {

        const options = {
            dots: false,
            className: "owl-theme",
            loop: false,
            nav: true,
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

        return (
            <div className="top-branding">
                <div className="container">
                    <div className="page-heading">
                        <div className="text-center">
                            <div className="text-center">
                                <span>
                                <i className="fa fa-star" />
                                </span>
                                <span>
                                <i className="fa fa-star star-midle" />
                                </span>
                                <span>
                                <i className="fa fa-star" />
                                </span>
                            </div>
                            <h3>{this.lang.popular_package}</h3>
                            <hr />
                            <p>{this.lang.popular_package_desc}</p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        
                        {this.state.data.length > 0 ? (
                            <OwlCarousel
                                margin={20}
                                items={4}
                                {...options}
                            >
                            {this.state.data.map((data_map, i) => {
                                return (
                                    
                                    <div className="card shadow bg-white item" key={i}>
                                    <img
                                    className="card-img-top"
                                    src={
                                        process.env.REACT_APP_CDN_PRODUCT + data_map.image
                                    }
                                    alt={data_map.name}
                                    />
                                    <div className="container mt-1">
                                    <h6>{data_map.name}</h6>
                                    <p>
                                        {/* <span>
                                        <i className="fa fa-star" />
                                        4.5
                                        </span>
                                        <span>(50 Ulasan) | 500 kali dipesan</span> */}
                                    </p>
                                    <div className='row'>
                                        <div className='col-7 mt-2'>
                                        <p style={{ fontSize: 16, fontWeight: "bold" }}>
                                            Rp. {this.formatCurrency(data_map.price)},-
                                        </p>
                                        </div>
                                        <div className=' col-5'>
                                        <Link to={'/travel/detail/' + data_map.slug} className='btn btn-danger col-12'>Pesan</Link>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                );
                            })}
                            </OwlCarousel>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default CTopPackacge;
