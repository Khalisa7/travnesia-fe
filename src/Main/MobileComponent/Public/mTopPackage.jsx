import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './style/sMobileTopPackage.css'
import 'react-web-tabs/dist/react-web-tabs.css';

import OwlCarousel from "react-owl-carousel";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './style/sMobileTopPackage.css'
import ContentLoader from './../../ContentLoader/MobileView/MobileTopPackage'
import HomeManifest from '../../../_services/home/HomeManifest.js'
import Pic1 from '../../Components/Public/img/map-adventure.jpg'


class MTopPackage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            content: <ContentLoader />
        }

        this.Manifest = new HomeManifest()
        // this.Translations = new Translations()
        // var Locale = this.Translations.locale()
        // this.lang = new LocalizedStrings({Locale})
    }

    componentDidMount() {
        this.Manifest.popularTravelProduct()
            .then(res => {
                let data_map = res.result.map((data) => {
                    return data
                })
                this.setState({ data: data_map })
                setTimeout(() => this.setState({ content: this.content() }), 1500)
            })
            .catch(err => {
                console.log(err)
            })
    }
    componentWillUnmount() {
        this.setState({ data: [] })
    }

    content() {
        return (
            <div>
                {this.state.data.length > 0 ?
                    <OwlCarousel
                        className="owl-theme"
                        loop={false} nav={false} dots={false} margin={10} stagePadding={20} items={1}
                    >
                        {this.state.data.map((data_map, i) => {
                            return (
                                <div className='card shadow bg-white item' key={i}>
                                    <img className='card-img-top' src={process.env.REACT_APP_CDN_PRODUCT + data_map.image} alt={data_map.name} />
                                    <div className='container mt-1'>
                                        <span>{data_map.name}</span><br />
                                        <p>
                                            {/* <span><i className='fa fa-star' />4.5</span>
                                            <span>(50 Ulasan) | 500 kali dipesan</span> */}
                                        </p>
                                        <div className='row'>
                                            <div className='col-7 mt-2'>
                                                <p style={{ fontSize: 16, fontWeight: "bold" }}>
                                                    Rp. {data_map.price.toLocaleString()}
                                                </p>
                                            </div>
                                            <div className=' col-5'>
                                                <a href={process.env.PUBLIC_URL + 'travel/detail/' + data_map.slug} className='btn btn-danger col-12'>Pesan</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </OwlCarousel> : null
                }
            </div>
        )
    }

    render() {
        return (
            <div className='m_topbranding'>
                <div className="container-fluid">
                    <h5>Top Branding Package</h5>
                    <div className="row">
                        <div className="col-12 px-0">
                            {this.state.content}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default MTopPackage
