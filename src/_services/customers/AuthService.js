import decode from 'jwt-decode'
import axios from 'axios'
import Encryption from '../../_config/security/Encryption'

export default class AuthService {
  // Initializing important variables
  constructor(props) {
    this.encrypt = new Encryption()
  }

  login(username, password) {
    // Get a token from api server using the fetch api
    return axios({
      url: process.env.REACT_APP_ENDPOINT + 'user/signin',
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
          window.location = '/'
        }
        return Promise.resolve(res)
      })
  }

  register(username, password, confpassword, firstname, lastname) {
    // Get a token from api server using the fetch api
    return axios({
      url: process.env.REACT_APP_ENDPOINT + 'user/signup',
      method: 'POST',
      credentials: "include",
      mode: 'cors',
      data: JSON.stringify({
        'username': username,
        'password': password,
        'firstname': firstname,
        'lastname': lastname
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
      url: process.env.REACT_APP_ENDPOINT + 'user/signin',
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

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken()
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json())
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }
}
