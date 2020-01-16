import React, { Component } from 'react'
import './style/sTopActivity.css'
import 'react-web-tabs/dist/react-web-tabs.css';

import OwlCarousel from "react-owl-carousel";
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Pic1 from './img/map-adventure.jpg'


class CTopPackacge extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mobile: false
        }
    }


    mobileRenderOwlCarousel() {
        return (
            <div>
                <OwlCarousel
                    className="owl-theme"
                    loop={false}
                    dots={false}
                    margin={10}
                    stagePadding={this.state.mobile ? 50 : 28}
                    items={this.state.mobile ? 1 : 4}>
                    <a href='#'>
                        <div className='card shadow bg-white '>
                            <img className='card-img-top' src={Pic1} alt='yogyakarta' />
                            <div className='container mt-1'>
                                <span>Pantai serandakan + diving</span><br />
                                <div className='line-2'>
                                    <i className='fa fa-star' />
                                    <p style={{ color: '#f1c40f' }}>4.5</p>
                                    <p style={{ color: '#95a5a6' }}> (50 Ulasan) | 500 kali dipesan</p>
                                </div>
                                <p style={{ fontSize: 16, fontWeight: 'bold' }}>Rp. 250.000,-</p>
                            </div>
                        </div>
                    </a>
                    <a href='#'>
                        <div className='card shadow bg-white'>
                            <img className='card-img-top' src={Pic1} alt='yogyakarta' />
                            <div className='container mt-1'>
                                <span>Pantai serandakan + diving</span><br />
                                <div className='line-2'>
                                    <i className='fa fa-star' />
                                    <p style={{ color: '#f1c40f' }}>4.5</p>
                                    <p style={{ color: '#95a5a6' }}> (50 Ulasan) | 500 kali dipesan</p>
                                </div>
                                <p style={{ fontSize: 16, fontWeight: 'bold' }}>Rp. 250.000,-</p>
                            </div>
                        </div>
                    </a>
                    <a href='#'>
                        <div className='card shadow bg-white'>
                            <img className='card-img-top' src={Pic1} alt='yogyakarta' />
                            <div className='container mt-1'>
                                <span>Pantai serandakan + diving</span><br />
                                <div className='line-2'>
                                    <i className='fa fa-star' />
                                    <p style={{ color: '#f1c40f' }}>4.5</p>
                                    <p style={{ color: '#95a5a6' }}> (50 Ulasan) | 500 kali dipesan</p>
                                </div>
                                <p style={{ fontSize: 16, fontWeight: 'bold' }}>Rp. 250.000,-</p>
                            </div>
                        </div>
                    </a>
                    <a href='#'>
                        <div className='card shadow bg-white'>
                            <img className='card-img-top' src={Pic1} alt='yogyakarta' />
                            <div className='container mt-1'>
                                <span>Pantai serandakan + diving</span><br />
                                <div className='line-2'>
                                    <i className='fa fa-star' />
                                    <p style={{ color: '#f1c40f' }}>4.5</p>
                                    <p style={{ color: '#95a5a6' }}> (50 Ulasan) | 500 kali dipesan</p>
                                </div>
                                <p style={{ fontSize: 16, fontWeight: 'bold' }}>Rp. 250.000,-</p>
                            </div>
                        </div>
                    </a>
                </OwlCarousel>
            </div>
        )
    }

    render() {
        return (
            <div className='top-activity'>
                <div className="container">
                    <div className='page-heading'>
                        <div className='text-center'>
                            <h3>Top Activity</h3>
                            <hr />
                            <p>Explore some activity.</p>
                        </div>
                    </div>
                    <div className='mobile-owl-carousel'>
                        {this.mobileRenderOwlCarousel()}
                    </div>
                </div>
            </div>

        )
    }
}

export default CTopPackacge
