import axios from 'axios'
import Encryption from './../security/Encryption'
import { stat } from 'fs';

export default class AccessControl {
  constructor(domain) {
    this.domain = domain || process.env.REACT_APP_ENDPOINT
    this.encrypt = new Encryption()
  }

  loggedIn() {
    const token = this.getToken()
    const checkToken = this.isTokenExpired(token)
    var status;
    if (token && checkToken) {
      if (this.userType() === 'partner') {
        status = 'partner'
      } else if (this.userType() === 'user') {
        status = 'user'
      }
    } else {
      status = false
    }

    return status
  }

  user() {
    let filter = this.getToken()
    let data = filter.split(".")
    let decode = Buffer.from(data[1], 'base64').toString('ascii')
    decode = JSON.parse(decode)
    return decode.user
  }

  userType() {
    let filter = this.getToken()
    let data = filter.split(".")
    let decode = Buffer.from(data[1], 'base64').toString('ascii')
    decode = JSON.parse(decode)
    return decode.type
  }


  isTokenExpired(token) {
    try {
      return axios({
        url: process.env.REACT_APP_ENDPOINT + 'app/validate',
        credentials: 'include',
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Mbcp0FzR-J3Mjwh0E5Dq414nNYDCD5bcJa74',
          'x-api-key': token
        }
      })
        .then(res => {
          if (res.data.result.valid) {
            return true
          } else {
            localStorage.removeItem('travnesia_loggedin')
            localStorage.setItem('token', res.data.result.userContext)
            return false
          }

        })
    } catch (err) {
      localStorage.removeItem('travnesia_loggedin')
    }
  }

  encode(token) {
    return this.encrypt.encode(token)
  }

  decode(token) {
    return this.encrypt.decrypt(token)
  }

  setToken(idToken) {
    localStorage.setItem('travnesia_loggedin', idToken)
  }

  getToken() {
    return this.encrypt.decrypt(localStorage.getItem('travnesia_loggedin'))
  }

  logout() {
    localStorage.removeItem('travnesia_loggedin')
  }
}
