import axios from 'axios'
import Encryption from '../../_config/security/Encryption'

export default class VendorDetail {
	constructor (){
		this.encrypt = new Encryption()
	}

	getProfile(){
		return axios({
			url		: process.env.REACT_APP_ENDPOINT + 'vendor/profile/data',
			method 	: 'GET',
			mode	: 'cors',
			headers : {
				'Content-Type'	: 'application/json',
				'Authorization'	: 'Bearer ' + this.encrypt.decrypt(localStorage.getItem('travnesia_loggedin'))
			}	
		}).then(res => {
			return Promise.resolve(res.data)
		})
	}

	getProducts(){
		try{
			return axios({
				url : process.env.REACT_APP_ENDPOINT + 'vendor/profile/data/product',
				method : 'GET',
				mode : 'cors',
				headers : {
					'Chace-Control' : 'no-cache',
	                'Content-Type'  : 'application/json',
	                'Accept'        : 'application/json',
					'Authorization'	: 'Bearer ' + this.encrypt.decrypt(localStorage.getItem('travnesia_loggedin'))
				}
			}).then(res => {
				return Promise.resolve(res.data)
			})
		} catch(err){
			return false
		}
	}

	deleteProduct(slug){
		try {
			return axios({
				url: process.env.REACT_APP_ENDPOINT + 'vendor/travel/product/' + slug,
				method: 'DELETE',
				mode: 'cors',
				headers: {
					'Authorization': 'Bearer ' + this.encrypt.decrypt(localStorage.getItem('travnesia_loggedin'))
				}
			}).then(res => {
				return Promise.resolve(res.data)
			})
		} catch (error) {
			
		}
	}

	updateProfile(body){
		try{
			return axios({
				url : process.env.REACT_APP_ENDPOINT + 'vendor/profile/update',
				method	: 'PUT',
				mode	: 'cors',
				data	: JSON.stringify({
					'first_name' : body.firstName,
	                'last_name'  : body.lastName,
	                'address'   : body.address,
	                'phone'     : body.phone,
	                'company_name' : body.companyName,
	                'email'		: body.email,
	                'city'      : body.city,
	                'country'   : body.country,
	                'postal_code': body.postalCode,
				}),
				headers : {
					// 'Accept'		: 'application/json',
					'Content-Type' : 'application/json',
					'Authorization' : 'Bearer ' + this.encrypt.decrypt(localStorage.getItem('travnesia_loggedin'))
				},
			}).then(res => {
				return Promise.resolve(res.data)
			})
		} catch(err){
			return false
		}
	}

	uploadPhoto(body){
		return axios({
			url 	: process.env.REACT_APP_ENDPOINT + 'vendor/profile/update/photo',
			method 	: 'POST',
			mode	: 'cors',
			data	: JSON.stringify({
				'avatar'	: body.avatar
			}),
			headers : {
				'Cache-Control' : 'no-cache',
				'Content-Type'	: 'application/json',
				'Accept'		: 'application/json',
				'Authorization'	: 'Bearer ' + this.encrypt.decrypt(localStorage.getItem('travnesia_loggedin'))
			}
		}).then(res => {
			return Promise.resolve(res.data)
		})
	}
}