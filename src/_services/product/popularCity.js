import axios from 'axios'

export default class popularCity {
    getCityPop(){
        return axios({
            url     : process.env.REACT_APP_ENDPOINT + 'destination/popular',
            method  : 'GET',
            mode    : 'cors',
            headers : {
                'Content-Type'  : 'application/json',
                'Accept'        : 'applicattion/json'
            }
        })
        .then(res =>{
            return Promise.resolve(res.data)
        })
    }
    
}