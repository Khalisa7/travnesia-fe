import axios from 'axios'
import AuthService from '../AuthService';


export default class CartService {
    constructor() {
        this.Auth = new AuthService()
    }

    formatDate(date) {
        date = new Date(date);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }

    /* Fungsi formatRupiah */
    formatRupiah(angka, prefix) {
        try {
            var number_string = angka.toString(),
                split = number_string.split(','),
                sisa = split[0].length % 3,
                rupiah = split[0].substr(0, sisa),
                ribuan = split[0].substr(sisa).match(/\d{3}/gi);

            // tambahkan titik jika yang di input sudah menjadi angka ribuan
            if (ribuan) {
                let separator = sisa ? '.' : '';
                rupiah += separator + ribuan.join('.');
            }

            rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
            return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
        } catch (err) {
            console.log(err)
        }
    }

    getCart() {
        let url = process.env.REACT_APP_ENDPOINT + 'shoppingcart/data'
        return fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + this.Auth.getToken()
            }
        })
    }


    updateItem(packageId, subPackageId, qty, date) {
        let data = {}
        let url = process.env.REACT_APP_ENDPOINT + 'shoppingcart/data'

        if (packageId && !subPackageId || subPackageId == null) {
            data = {
                product_id: packageId,
                date: date,
                qty: qty
            }
        } else if (subPackageId != null) {
            data = {
                product_id: packageId,
                subpackage_id: subPackageId,
                date: date,
                qty: qty,
            }
        }

        return axios({
            url: url,
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + this.Auth.getToken()
            },
            data: data
        })
    }

    deleteItem(package_id, subpackage_id) {
        package_id = package_id
        subpackage_id = subpackage_id || null
        let url = process.env.REACT_APP_ENDPOINT + 'shoppingcart/data/'
        if (subpackage_id == null) {
            return axios.delete(url + package_id, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Authorization': 'Bearer ' + this.Auth.getToken()
                }
            })
        } else {
            return axios.delete(url + package_id + '/' + subpackage_id, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Authorization': 'Bearer ' + this.Auth.getToken()
                }
            })
        }
    }

}
