import React, { Component } from 'react'
import './style/sSubscribe.css'
import Translations from './../../../localization/translations.js'
import LocalizedStrings from 'react-localization'

class CSubscribe extends Component {
	constructor(props){
		super(props)
		//Translations
		this.Translations = new Translations()
		var Locale = this.Translations.locale()
		this.lang = new LocalizedStrings({Locale})
	}
	
	render () {
		return (
			<div id='more-info' className='container-fluid'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<div className='row-title'>
								{ this.lang.news_letter_title }
							</div>
							<div className='row-subtitle'>
								{ this.lang.news_letter_description }
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-12'>
							<form className='form-inline justify-content-center'>
								<div className='form-group mb-2'>
									<input type='email' className='form-control' id='' placeholder={ this.lang.news_letter_placeholder } />
								</div>
								<div className='form-group mb-2 ml-2'>
									<button type='submit' className=' btn btn-outline-light'>{ this.lang.register_now }</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default CSubscribe
