import axios from 'axios'
import Encryption from '../../_config/security/Encryption'

export default class OrderService{
    constructor (){
        this.encrypt = new Encryption()
    }

    getHistory(){
        return axios({
            url     : process.env.REACT_APP_ENDPOINT + 'history',
            method  : 'GET',
            mode    : 'cors',
            headers : {
                'Content-Type'  : 'application/json',
                'Authorization' : 'Bearer ' + this.encrypt.decrypt(localStorage.getItem('travnesia_loggedin'))
            } 
        })
        .then(res => {
            return Promise.resolve(res.data)
        })
    }

    getBooking(){
        return axios({
            url     : process.env.REACT_APP_ENDPOINT + 'mybooking',
            method  : 'GET',
            mode    : 'cors',
            headers :{
                'Content-Type'  : 'application/json',
                'Authorization' : 'Bearer ' + this.encrypt.decrypt(localStorage.getItem('travnesia_loggedin'))
            }
        })
        .then(res => {
            return Promise.resolve(res.data)
        })
    }

    getLastBooking(){
        return axios({
            url     : process.env.REACT_APP_ENDPOINT + 'mybooking/last',
            method  : 'GET',
            mode    : 'cors',
            headers :{
                'Content-Type'  : 'application/json',
                'Authorization' : 'Bearer ' + this.encrypt.decrypt(localStorage.getItem('travnesia_loggedin'))
            }
        })
        .then(res => {
            return Promise.resolve(res.data)
        })
    }

}