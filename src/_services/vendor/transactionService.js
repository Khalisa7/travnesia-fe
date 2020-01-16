import axios from 'axios'
import Encryption from '../../_config/security/Encryption'

export default class transactionService {
    constructor() {
        this.Encryption = new Encryption()
    }

    getTransaction() {
        return axios({
            url: process.env.REACT_APP_ENDPOINT + 'vendor/transaction',
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.Encryption.decrypt(localStorage.getItem('travnesia_loggedin'))
            }
        })
            .then(res => {
                return Promise.resolve(res.data)
            })
    }

    accept(orderId) {
        return axios({
            url: process.env.REACT_APP_ENDPOINT + 'vendor/accept/order/' + orderId,
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Cotent-Type': 'application/json',
                'Authorization': 'Bearer ' + this.Encryption.decrypt(localStorage.getItem('travnesia_loggedin'))
            }
        })
            .then(res => {
                return Promise.resolve(res.data)
            })
    }
    
    reject(orderId) {
        return axios({
            url: process.env.REACT_APP_ENDPOINT + 'vendor/reject/order/' + orderId,
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Cotent-Type': 'application/json',
                'Authorization': 'Bearer ' + this.Encryption.decrypt(localStorage.getItem('travnesia_loggedin'))
            }
        })
            .then(res => {
                return Promise.resolve(res.data)
            })
    }
}