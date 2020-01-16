import React, { Component } from 'react'
import './style/sPopularDestination.css'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import HomeManifest from '../../../_services/home/HomeManifest.js'
import Translations from '../../../localization/translations.js'
import LocalizedStrings from 'react-localization'
import Cookies from 'universal-cookie'
import ContentLoader from './../../ContentLoader/DesktopView/PopularDestinationLoader'

const cookies = new Cookies();

class CPopularDestination extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loader: '',
            content: <ContentLoader />
        }

        this.Manifest = new HomeManifest()
        this.Translations = new Translations()
        var Locale = this.Translations.locale()
        this.langCode = cookies.get('lang')
        this.lang = new LocalizedStrings({ Locale })
    }

    componentDidMount() {
        this.Manifest.popularDestination()
            .then(res => {
                let data_map = res.result.map((data) => {
                    return data
                })
                this.setState({ data: data_map })
                setTimeout(() => this.setState({ content: this.content() }), 1500)
            })
            .catch(err => {
                return false
            })
    }


    getDesc(data_map) {
        if (this.langCode == 'id') {
            var popular_desc = data_map.short_desc.id
        } else if (this.langCode == 'en') {
            var popular_desc = data_map.short_desc.en
        } else if (this.langCode == 'an') {
            var popular_desc = data_map.short_desc.an
        } else if (this.langCode == 'zh') {
            var popular_desc = data_map.short_desc.zh
        } else {
            var popular_desc = data_map.short_desc.en
        }

        return popular_desc
    }

    content() {
        return (
            <div className="row">
                {this.state.data.map((data_map, i) => {

                    if (data_map.type == 1) {
                        var featured = 'col-md-8'
                    } else {
                        var featured = 'col-md-4'
                    }

                    return (
                        <div className={featured + " block padding-5"} key={i}>
                            <a href={process.env.PUBLIC_URL + 'city/' + data_map.slug}>
                                <div className='card h-230'>
                                    <div className='card-counter'>
                                        {data_map.availablePackage + this.lang.available_package}
                                    </div>
                                    <img src={process.env.REACT_APP_CDN_PRODUCT + data_map.image} alt={data_map.name} />
                                    <div className='card-caption'>
                                        <h5>{data_map.name}</h5>
                                        <p>{this.getDesc(data_map)}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    )
                })}
            </div>

        )
    }

    render() {
        return (
            <div className='container home'>
                <div>
                    <div className='page-heading'>
                        <div className='text-center'>
                            <div className='text-center'>
                                <span><i className='fa fa-star' /></span>
                                <span><i className='fa fa-star star-midle' /></span>
                                <span><i className='fa fa-star' /></span>
                            </div>
                            <h3>{this.lang.top_destination}</h3>
                            <hr />
                            <p>{this.lang.top_destination_desc}</p>
                        </div>
                    </div>
                    {this.state.content}
                </div>
                <br />
                <div className='row justify-content-center'>
                    <div className='form-group'>
                        <div className='input-group'>
                            <a className='btn btn-danger' href='' >{this.lang.more_top_destination_btn}</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CPopularDestination
