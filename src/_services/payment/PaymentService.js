import axios from 'axios'
import Encryption from './../../_config/security/Encryption'

export default class PaymentService {
  constructor(domain) {
    this.domain = domain || process.env.REACT_APP_ENDPOINT
    this.encrypt = new Encryption()
  }

  paymentStatus(orderId) {
    return axios({
      url: process.env.REACT_APP_ENDPOINT + 'transaction/status',
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.encrypt.decrypt(localStorage.getItem('travnesia_loggedin'))
      },
      data: JSON.stringify({
        'order_id': orderId
      })
    })
      .then(res => {
        return Promise.resolve(res)
      })
  }
}
