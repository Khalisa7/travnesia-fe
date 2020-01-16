import React, { Component } from 'react'
import './style/sPartnership.css'
import Translations from './../../../localization/translations.js'
import LocalizedStrings from 'react-localization'

class CPartnership extends Component {
	constructor (props) {
		super(props)

		//Translations
		this.Translations = new Translations()
		var Locale = this.Translations.locale()
		this.lang = new LocalizedStrings({Locale})

	}

	render () {
		return (
			<div className='partnership-dekstop container'>
				{/* <div className='page-heading'>
					<div className='text-center'>
						<div className='text-center'>
							<span><i className='fa fa-star' /></span>
							<span><i className='fa fa-star star-midle' /></span>
							<span><i className='fa fa-star' /></span>
						</div>
						<h3>{ this.lang.partnership_title }</h3>
						<hr />
						<p>{ this.lang.partnership_description }</p>
					</div>
				</div> */}
				<div className='text-center'>
					<div className='row justify-content-center'>
						<div className='col-12'>
							<div className=' sprites-partnership sprites-1 sprites-hover'/>
							<div className=' sprites-partnership sprites-2 sprites-hover'/>
							<div className=' sprites-partnership sprites-3 sprites-hover'/>
							<div className=' sprites-partnership sprites-4 sprites-hover'/>
						</div>
						<div className='col-12 mb-5'>
							<div className=' sprites-bank sprites-5 sprites-hover'/>
							<div className=' sprites-bank sprites-6 sprites-hover'/>
							<div className=' sprites-bank sprites-7 sprites-hover'/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default CPartnership
