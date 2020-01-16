import React, { Component } from 'react'
import './style/sMobilePopularDestination.css'

import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import HomeManifest from '../../../_services/home/HomeManifest.js'
import Translations from '../../../localization/translations.js'
import LocalizedStrings from 'react-localization'
import Cookies from 'universal-cookie';
import ContentLoader from './../../ContentLoader/MobileView/MobilePopularDestination'


const cookies = new Cookies();

class MPopularDestination extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			content: <ContentLoader />
		}

		this.Manifest = new HomeManifest()

		this.Translations = new Translations()
		this.langCode = cookies.get('lang')
		var Locale = this.Translations.locale()
		this.lang = new LocalizedStrings({ Locale })
		// this.content = this.content.bind(this)
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

	componentWillUnmount() {
		this.setState({ data: [] })
	}

	// componentDidMount(){
	//     setTimeout(() => this.setState({content:this.content()}), 1500)
	// }

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
			<div>
				{this.state.data.length > 0 ?
					<OwlCarousel className="owl-theme" loop={false} nav={false} dots={false} margin={10} stagePadding={20} items={1} >
						{this.state.data.map((data_map, i) => {
							return (
								<div className="item shadow-sm" key={i}>
									<a href={process.env.PUBLIC_URL + 'city/' + data_map.slug}>
										<div className='card h-230 border-0' style={{ backgroundImage: "url(" + process.env.REACT_APP_CDN_PRODUCT + data_map.image + ")" }}>
											<div className='card-counter'>
												{data_map.availablePackage + this.lang.available_package}
											</div>
											{/* <img src={process.env.REACT_APP_CDN_URL + 'public/product/' + data_map.image} /> */}
											<div className='card-caption'>
												<h5>{data_map.name}</h5>
												<p>{this.getDesc(data_map)}</p>
											</div>
										</div>
									</a>
								</div>
							);
						})}
					</OwlCarousel> : null
				}
			</div>
		)
	}

	render() {
		return (
			<div className='container-fluid m_Home py-4'>
				<h5>{this.lang.top_destination}</h5>
				<div className="row">
					<div className="col-md-12 px-0">
						{this.state.content}
					</div>
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

export default MPopularDestination
