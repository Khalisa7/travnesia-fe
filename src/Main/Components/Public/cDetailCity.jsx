import React, { Component } from 'react';
import './style/sDetailCity.css'
import {isMobile, isBrowser} from "react-device-detect";

class CDetailCity extends Component {
    render() {
        return (
            <div className='Detail-city mb-4'> 
                <div className='container border-3 rounded shadow p-3 '>
                    <div className='row border-bottom pb-3'>
                        <div className='col-md-8 col-sm-12'>
                            <h4>Tentang Tokyo</h4>
                                <p className="">
                                Lebih dari 10 juta wisatawan berkunjung ke Tokyo setiap tahunnya dan jumlah ini terus meningkat. Setiap orang tahu bahwa Tokyo merupakan ibu kota Jepang sekaligus kota paling metropolis di dunia. Sangat mudah menyaksikan bagaimana modernitas dan budaya tradisional melebur jadi satu di sini.
                                <br /><br />
                                Jika anda berencana jalan-jalan di Tokyo, cobalah mengikuti tour menyusuri kuil-kuil bersejarahnya, hingga menjelajah di antara gedung-gedung pencakar langit yang dipenuhi oleh lampu-lampu neon. Singgahlah di Sensō-ji, kuil Buddha tertua dan terbesar, lalu jangan lupa isi liburan anda di Tokyo Sky Tree, menara tertinggi di Jepang yang menawarkan lanskap tak tertandingi. Namun yang paling wajib, jangan lupa berkunjung ke dunia yang penuh keajaiban: Tokyo Disneyland dan Tokyo DisneySea!
                            </p>
                        </div>
                        <div className="col-4">
                            <iframe width="335" height="240" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=139.4151306152344%2C35.48191987272801%2C140.16357421875003%2C35.917971791312816&amp;layer=mapnik">
                            </iframe><br/>
                            <small><a href="https://www.openstreetmap.org/#map=11/35.7002/139.7894">View Larger Map</a></small>
                        </div>
                    </div>
                    <div className="row mb-4 mt-4">
                        <div className="col-lg-12">
                            <div>
                                {isMobile ? <h5 className='float-left'>Cuaca Setempat</h5> : <h4 className='float-left'>Cuaca Setempat</h4>}
                                <div className='float-left ml-lg-3'>
                                    <p className="detail-city-button float-left mr-0">℉</p>
                                    <p className="detail-city-button float-left ml-0">℃</p>
                                </div>
                                <ul className="detail-city-temp list-inline mb-0">
                                    <li className='list-inline-item mr-md-0'>
                                        <header>DEC - FEB</header>
                                        <div className="js-temp-view">
                                            <span data-celsius="11" data-sign-c="°" data-sign-f="°" className="t24">11°</span>
                                            <span data-celsius="2" data-sign-c="°" data-sign-f="°" className="t24 u_t_gray_9">2°</span>
                                        </div>
                                        <p></p>
                                    </li>
                                    <li className='list-inline-item mr-md-0'>
                                        <header>MAR - MAY</header>
                                        <div className="js-temp-view">
                                            <span data-celsius="21" data-sign-c="°" data-sign-f="°" className="t24">21°</span>
                                            <span data-celsius="5" data-sign-c="°" data-sign-f="°" className="t24 u_t_gray_9">5°</span>
                                        </div>
                                        <p></p>
                                    </li>
                                    <li className='list-inline-item mr-md-0'>
                                        <header>JUN - AUG</header>
                                        <div className="js-temp-view">
                                            <span data-celsius="29" data-sign-c="°" data-sign-f="°" className="t24">29°</span>
                                            <span data-celsius="18" data-sign-c="°" data-sign-f="°" className="t24 u_t_gray_9">18°</span>
                                        </div>
                                        <p></p>
                                    </li>
                                    <li className='list-inline-item mr-md-0'>
                                        <header>SEP - NOV</header>
                                        <div className="js-temp-view">
                                            <span data-celsius="20" data-sign-c="°" data-sign-f="°" className="t24">20°</span>
                                            <span data-celsius="9" data-sign-c="°" data-sign-f="°" className="t24 u_t_gray_9">9°</span>
                                        </div>
                                        <p></p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row pt-4 detail-city-general">
                        <div className="col-lg-6">
                            {isMobile ? <h5>Informasi Umum</h5> : <h3>Informasi Umum</h3> }
                            <div className="row mt-4 mb-3 mb-lg-0">
                                <div className="col-lg-6">
                                    <ul>
                                        <li>
                                            <p className="mb-0">Zona waktu</p>
                                        </li>
                                        <li>
                                            {isMobile ? <h6>GMT +09.00</h6> : <h5>GMT +09.00</h5>}
                                        </li>
                                        <li>
                                            <p className="mb-0">2 jam lebih awal</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-6">
                                    <ul>
                                        <li>
                                            <p className="mb-0">Mata uang</p>
                                        </li>
                                        <li>
                                            {isMobile ? <h6>Yen Jepang</h6> : <h5>Yen Jepang</h5>}
                                        </li>
                                        <li>
                                            <p className="mb-0">1 JPY = 132.23IDR</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            {isMobile ? <h5>Informasi Tambahan</h5> : <h3>Informasi Tambahan</h3>}
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <div className='row mt-3'style={isMobile ? {top:49+'px'}:{top:57+'px'}}>
                        <div className="pos-f-t w-100">
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <div className="collapse" id="navbarToggleExternalContent">
                                        <div className=" p-4">
                                            <div className="page-heading clearfix">
                                                <h6 className="float-left mt-2">
                                                Filter Paket Yang Diinginkan
                                                </h6>
                                                <span className="float-right mt-1">
                                                <i
                                                    data-toggle="collapse"
                                                    data-target="#filter2"
                                                    aria-expanded="false"
                                                    aria-controls="filter2"
                                                    ref="filter2"
                                                />
                                                </span>
                                            </div>
                                            <div className="row justify-content-center">
                                                <div className="col-md-12">
                                                <div
                                                    className="collapse show b-0 mt-2"
                                                    id="filter2"
                                                >
                                                    <div className="form-row range-price">
                                                    <div className="col-5">
                                                        <div className="loat-left">
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="highestPrice"
                                                        >
                                                            Rp 0 ,00
                                                        </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-7">
                                                        <div className="float-right">
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="lowestPrice"
                                                        >
                                                            Rp.10.00000
                                                        </label>
                                                        </div>
                                                    </div>
                                                    </div>

                                                    <input
                                                    type="range"
                                                    className="custom-range"
                                                    min={0}
                                                    max={15000000}
                                                    step={1000000}
                                                    />
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                <div className="collapse" id="navbarToggleExternalContent">
                                        <div className=" p-4">
                                            <div className="page-heading clearfix">
                                                <h6 className="float-left mt-2">
                                                Sortir Paket
                                                </h6>
                                                <span className="float-right mt-1">
                                                <i
                                                    data-toggle="collapse"
                                                    data-target="#filter2"
                                                    aria-expanded="false"
                                                    aria-controls="filter2"
                                                    ref="filter2"
                                                />
                                                </span>
                                            </div>
                                            <div className="row justify-content-center">
                                                <div className='col-6'>
                                                    <input type="radio"/>Highest Price
                                                </div>
                                                <div className='col-6'>
                                                    <input type="radio"/>Lowest Price
                                                </div>
                                                <br/><br/>
                                                <div className='col-6'>
                                                    <input type="radio"/>Review Score
                                                </div>
                                                <div className='col-6'>
                                                    <input type="radio"/>Highest Popularity
                                                </div>
                                                <div className='col-6 mt-3'>
                                                    <button className='w-100 btn btn-danger'>Cari</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <nav className="navbar navbar-dark">
                                <button className='btn btn-danger' type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                                    Ganti Pencarian
                                </button>
                            </nav>
                        </div>
                    </div>

                    <div className="pack-availble row mt-3 ">
                        <div className='col-md-3 col-sm-6 mb-3'>
                            <div className="card shadow">
                                <img className='card-img-top' src="https://images.unsplash.com/photo-1490677343801-763ce536dfb3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjQ5Mjk2fQ" alt=""/>
                                <div className='card-body p-2'>
                                    <h5>Makan malam di sini aja broh murah</h5>
                                    <div className='row '>
                                        <b className='col-6 price-font'>Rp. 10.222.222</b>
                                        <div className='col-6 '>
                                            <p className='float-right text-info price-font'>Tersedia Hari ini</p>
                                        </div>
                                    </div>
                                    <div className='float-right'>
                                        <a href="" className="btn btn-danger">Pesan</a>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                        <div className='col-md-3 col-sm-6 mb-3'>
                            <div className="card shadow">
                                <img className='card-img-top' src="https://images.unsplash.com/photo-1490677343801-763ce536dfb3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjQ5Mjk2fQ" alt=""/>
                                <div className='card-body p-2'>
                                    <h5>Makan malam di sini aja broh murah</h5>
                                    <div className='row '>
                                        <b className='col-6 price-font'>Rp. 10.222.222</b>
                                        <div className='col-6 '>
                                            <p className='float-right text-info price-font'>Tersedia Hari ini</p>
                                        </div>
                                    </div>
                                    <div className='float-right'>
                                        <a href="" className="btn btn-danger">Pesan</a>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                        <div className='col-md-3 col-sm-6 mb-3'>
                            <div className="card shadow">
                                <img className='card-img-top' src="https://images.unsplash.com/photo-1490677343801-763ce536dfb3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjQ5Mjk2fQ" alt=""/>
                                <div className='card-body p-2'>
                                    <h5>Makan malam di sini aja broh murah</h5>
                                    <div className='row '>
                                        <b className='col-6 price-font'>Rp. 10.222.222</b>
                                        <div className='col-6 '>
                                            <p className='float-right text-info price-font'>Tersedia Hari ini</p>
                                        </div>
                                    </div>
                                    <div className='float-right'>
                                        <a href="" className="btn btn-danger">Pesan</a>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                        <div className='col-md-3 col-sm-6 mb-3'>
                            <div className="card shadow">
                                <img className='card-img-top' src="https://images.unsplash.com/photo-1490677343801-763ce536dfb3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjQ5Mjk2fQ" alt=""/>
                                <div className='card-body p-2'>
                                    <h5>Makan malam di sini aja broh murah</h5>
                                    <div className='row '>
                                        <b className='col-6 price-font'>Rp. 10.222.222</b>
                                        <div className='col-6 '>
                                            <p className='float-right text-info price-font'>Tersedia Hari ini</p>
                                        </div>
                                    </div>
                                    <div className='float-right'>
                                        <a href="" className="btn btn-danger">Pesan</a>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        );
    }
}

export default CDetailCity;