import axios from 'axios'
import AccessControl from './../../_config/middleware/AccessControl'
export default class CheckoutService {
  // Initializing important variables
  constructor(domain) {
    this.domain = domain || process.env.REACT_APP_ENDPOINT // API server domain
    this.AccessControl = new AccessControl()
  }

  createOrder(body, token) {
    return axios({
      url: process.env.REACT_APP_ENDPOINT + 'order/create',
      method: 'POST',
      mode: 'cors',
      data: JSON.stringify({
        'customer_firstname': body.customer_firstname,
        'customer_lastname': body.customer_lastname,
        'customer_address': body.customer_address,
        'customer_city': body.customer_city,
        'customer_province': body.customer_province,
        'customer_country': body.customer_country,
        'customer_phone': body.customer_phone,
        'customer_email': body.customer_email,
        'token': token
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.AccessControl.getToken()
      }
    })
      .then(res => {
        return Promise.resolve(res)
      })
  }

  customerData(token) {
    return axios({
      url: process.env.REACT_APP_ENDPOINT + 'checkout/data?' + token,
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: 'Bearer ' + this.AccessControl.getToken()
      }
    })
      .then(res => {
        return Promise.resolve(res.data)
      })
  }

}
