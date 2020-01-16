import axios from 'axios'
import Encryption from '../../_config/security/Encryption'

export default class AuthService {

	constructor(domain) {
		this.encrypt = new Encryption()
	}

	login(username, password) {
		// Get a token from api server using the fetch api
		return axios({
			url: process.env.REACT_APP_ENDPOINT + 'vendor/signin',
			method: 'POST',
			credentials: "include",
			mode: 'cors',
			data: JSON.stringify({
				'username': username,
				'password': password,
			}),
			headers: {
				'Content-Type': 'application/json',
				'X-Requested-With': 'XMLHttpRequest',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		})
			.then(res => {
				this.setToken(this.encrypt.encrypt(res.data.result))
				if (res.data.result) {
					window.location = '/partner'
				}
				return Promise.resolve(res)
			})
	}

	register(username, password, confpassword, firstname, lastname, company_name) {
		// Get a token from api server using the fetch api
		return axios({
			url: process.env.REACT_APP_ENDPOINT + 'vendor/signup',
			method: 'POST',
			credentials: "include",
			mode: 'cors',
			data: JSON.stringify({
				'email': username,
				'password': password,
				'firstname': firstname,
				'lastname': lastname,
				'company_name': company_name
			}),
			headers: {
				'Content-Type': 'application/json',
				'X-Requested-With': 'XMLHttpRequest',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		})
			.then(res => {
				this.loginAfterRegister(username, password)
				return Promise.resolve(res)
			})
	}

	loginAfterRegister(username, password) {
		// Get a token from api server using the fetch api
		return axios({
			url: process.env.REACT_APP_ENDPOINT + 'vendor/signin',
			method: 'POST',
			credentials: "include",
			mode: 'cors',
			data: JSON.stringify({
				'username': username,
				'password': password,
			}),
			headers: {
				'Content-Type': 'application/json',
				'X-Requested-With': 'XMLHttpRequest',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		})
			.then(res => {
				this.setToken(this.encrypt.encrypt(res.data.result))
				if (res.data.result) {
					window.location = '/user/profile'
				}
				return Promise.resolve(res)
			})
	}

	setToken(idToken) {
		localStorage.setItem('travnesia_loggedin', idToken)
	}

	getToken() {
		return this.encrypt.decrypt(localStorage.getItem('travnesia_loggedin'))
	}
}
