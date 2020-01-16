import React, { Component } from 'react'
import './style/sMobilePartnership.css'
import Translations from './../../../localization/translations.js'
import LocalizedStrings from 'react-localization'

class MPartnership extends Component {
	constructor (props) {
		super(props)
		
		//Translations
		this.Translations = new Translations()
		var Locale = this.Translations.locale()
		this.lang = new LocalizedStrings({Locale})
		
	}
	
	render () {
		return (
			<div className='partnership-mobile container-fluid'>
				<div className={'text-center'}>
					<div className='row'>
						<div className='col-12 py-4'>
							<div className='sprites-1 sprites-partnership sprites-hover'/>
							<div className='sprites-2 sprites-partnership sprites-hover'/>
							<div className='sprites-3 sprites-partnership sprites-hover'/>
							<div className='sprites-4 sprites-partnership sprites-hover'/>
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

export default MPartnership
