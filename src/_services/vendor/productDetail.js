import axios from 'axios'
import Encryption from '../../_config/security/Encryption'


export default class productDetail {
    constructor() {
        this.Encryption = new Encryption()
    }

    getProduct(slug) {
        return axios({
            url : process.env.REACT_APP_ENDPOINT + 'vendor/travel/product/' + slug,
            method : 'GET',
            mode : 'cors',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + this.Encryption.decrypt(localStorage.getItem('travnesia_loggedin'))
            }
        })
        .then(res => {
            return Promise.resolve(res.data)
        })
    }
}