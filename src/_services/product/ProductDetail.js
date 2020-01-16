import axios from 'axios'

export default class ProductDetail {

  getDetail(slug) {
    return axios({
      url: process.env.REACT_APP_ENDPOINT + 'product/travel/detail/' + slug,
      method: 'GET',
      mode: 'cors',
      headers: {
        'Cache-Control' : 'no-cache',
		'Content-Type'  : 'application/json',
		'Accept'        : 'application/json'
      }
    })
    .then(res => {   
      return Promise.resolve(res.data)
    })
  }

}
