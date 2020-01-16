import React, { Component } from 'react'

import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import './style/sNearDestination.css'
import { isMobile, isBrowser } from "react-device-detect";


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

export default function NearDestination() {
  return (
    <section className="near-destination">
      <div className="container">
        {isMobile ? <h5 className="near-destination-heading">Destinasi Sekitar</h5> : <h3 className="near-destination-heading">Destinasi Sekitar</h3>}
        <div className="near-destination-owl-outer">
          <OwlCarousel
            margin={10}
            {...options}
          >
            <div className="item">
              <div className="card text-white">
                <img className="card-img" src="https://images.unsplash.com/photo-1478039160963-c94dcc67dd62?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=112&fit=max&ixid=eyJhcHBfaWQiOjQ5Mjk2fQ" alt="Card image" />
                <div className="card-img-overlay">
                  <h2 className="card-title">Kyoto</h2>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="card text-white">
                <img className="card-img" src="https://images.unsplash.com/photo-1522177743530-6dcab6baa5f5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=112&fit=max&ixid=eyJhcHBfaWQiOjQ5Mjk2fQ" alt="Card image" />
                <div className="card-img-overlay">
                  <h2 className="card-title">Kyushu</h2>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="card text-white">
                <img className="card-img" src="https://images.unsplash.com/photo-1514162646479-788afb83fdb9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjQ5Mjk2fQ" alt="Card image" />
                <div className="card-img-overlay">
                  <h2 className="card-title">Okinawa</h2>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="card text-white">
                <img className="card-img" src="https://images.unsplash.com/photo-1540920581535-461f1fc8fcaa?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=112&fit=crop&ixid=eyJhcHBfaWQiOjQ5Mjk2fQ" alt="Card image" />
                <div className="card-img-overlay">
                  <h2 className="card-title">Akihabara</h2>
                </div>
              </div>

            </div>
          </OwlCarousel>
        </div>
      </div>
    </section>
  )
}