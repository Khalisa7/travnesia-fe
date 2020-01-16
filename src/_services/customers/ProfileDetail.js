import axios from 'axios'
import Encryption from '../../_config/security/Encryption'

export default class ProfileDetail {
    constructor (){
        this.encrypt = new Encryption()
    } 


    getProfile(){
        return axios({
            url     : process.env.REACT_APP_ENDPOINT + 'user/profile/data',
            // url     : 'http://localhost:3001/api/v1/user/profile/data',
            method  : 'GET',
            mode    : 'cors',
            headers : {
                'Chace-Control' : 'no-cache',
                'Content-Type'  : 'application/json',
                'Accept'        : 'application/json',
                'Authorization' : 'Bearer ' + this.encrypt.decrypt(localStorage.getItem('travnesia_loggedin'))
            }
        })
        .then(res => {
            return Promise.resolve(res.data)
        })
    }

    updateProfile(body){
        try{
        return axios({
            url     : process.env.REACT_APP_ENDPOINT + 'user/profile/data',
            // url     : 'http://localhost:3001/api/v1/user/profile/data',
            method  : 'PUT',
            mode    : 'cors',
            data    : JSON.stringify({
                'firstName' : body.firstName,
                'lastName'  : body.lastName,
                'address'   : body.address,
                'phone'     : body.phone,
                'city'      : body.city,
                'country'   : body.country,
                'postalCode': body.postalCode,
            }),
            headers : {
                'Content-Type'  : 'application/json',
                'Authorization' : 'Bearer ' + this.encrypt.decrypt(localStorage.getItem('travnesia_loggedin'))
            }
        })
        .then(res => {
            return Promise.resolve(res.data)
        })
        } catch(err){
            return false
        }
    }

    uploadPhoto(body){
        return axios({
            url     : process.env.REACT_APP_ENDPOINT + 'user/profile/data/photo',
            // url     : 'http://localhost:3001/api/v1/user/profile/data',
            method  : 'POST',
            mode    : 'cors',
            data    : body,
            headers : {
                'Chace-Control' : 'no-cache',
                'Content-Type'  : 'multipart/form-data',
                'Authorization' : 'Bearer ' + this.encrypt.decrypt(localStorage.getItem('travnesia_loggedin'))
            }
        })
        .then(res => {
            return Promise.resolve(res.data)
        })
    }
}