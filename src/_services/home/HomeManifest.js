import decode from 'jwt-decode'
import axios from 'axios'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class HomeManifest {

  getSlide(){
    return axios({
      url: process.env.REACT_APP_ENDPOINT + 'promotion/slides',
      method: 'GET',
      mode: 'cors',
      headers: {
        'Cache-Control' : 'no-cache'
      }
    })
    .then(res => {   
      return Promise.resolve(res.data)
    })
  }

  popularDestination () {
    return axios({
      url: process.env.REACT_APP_ENDPOINT + 'product/travel/destination/popular',
      method: 'GET',
      mode: 'cors',
      headers: {
        'Cache-Control' : 'no-cache'
      }
    })
    .then(res => {   
      return Promise.resolve(res.data)
    })
  }

  popularTravelProduct () {
    return axios({
      url: process.env.REACT_APP_ENDPOINT + 'product/travel/popular',
      method: 'GET',
      mode: 'cors',
      headers: {
        'Cache-Control' : 'no-cache'
      }
    })
    .then(res => {   
      return Promise.resolve(res.data)
    })
  }
}
