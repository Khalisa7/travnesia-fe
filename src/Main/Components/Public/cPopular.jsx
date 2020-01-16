import React, { Component } from 'react'

import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import './style/sPopular.css'
import CityPop from '../../../_services/product/popularCity'

import { isMobile, isBrowser } from "react-device-detect";



class cPopular extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
        //backend services
        this.CityPop = new CityPop()
       
    }


    componentDidMount() {
     
    }


    render() {
        
        const options = {
            dots: false,
            className: "owl-theme",
            loop: true,
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
            <section className="popular-travel">
                <div className="container">
                    {isMobile ? <h6 className="popular-travel-heading">Popular Destination</h6> : <h4 className="popular-travel-heading">Popular Destination</h4>}

                    <div className="popular-travel-owl-outer">
                    {this.props.data.length > 0 ? (
                    <OwlCarousel
                    margin={10}
                    items={4}
                    {...options}>
                    {this.props.data.map((data_map,i)=>{
                                return(
                                    <div className="item" key={i}>
                                    <div className="card text-white">
                                        <img className="card-img" src={process.env.REACT_APP_CDN_CITY + data_map.image} alt="Card image" key={i}/>
                                        <div className="card-img-overlay">
                                            <h2 className="card-title" key={i}>{data_map.name}</h2>
                                        </div>
                                    </div>
                                </div>    
                      )
                    }
                    )}
                    </OwlCarousel>
                    ): null}
                    </div>

                </div>
            </section>
        )
    }
}

export default cPopular