import React, { Component } from 'react';
import './style/sProfile.css';
import ProfileDetail from '../../../_services/customers/ProfileDetail'
import countrymap from '../../../_services/json_data/country-list.json'
import Alert from '../../../_services/alert/Alert'
import Select from 'react-select'

class CProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],

            listAllCountry: [],

            //update from
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            companyName: '',
            address: '',
            city: '',
            zipCode: '',
            country: [],
        }

        //backend
        this.userDetail = new ProfileDetail()
        this.Alert = new Alert()

        //bind
        this.countryCode = this.countryCode.bind(this)
        this.getAllCountry = this.getAllCountry.bind(this)

        this.updateData = this.updateData.bind(this)
        // this.updatePhoto = this.updatePhoto.bind(this)

        this.updateFirstName = this.updateFirstName.bind(this)
        this.updateLastName = this.updateLastName.bind(this)
        this.updateAddress = this.updateAddress.bind(this)
        this.updatePhoneNumber = this.updatePhoneNumber.bind(this)
        this.updateEmail = this.updateEmail.bind(this)
        this.handlePhoto = this.handlePhoto.bind(this)
        this.handlePostalCode = this.handlePostalCode.bind(this)
        this.handleCountrySelect = this.handleCountrySelect.bind(this)
        this.updateCity = this.updateCity.bind(this)


    }

    componentDidMount() {
        // console.log(this.userDetail.updateProfile())
        // countrymap.map((data)=>console.log(data))
        this.userDetail.getProfile()
            .then(res => {
                this.setState({ data: res.result })
                this.setState({
                    firstName: this.state.data.first_name,
                    lastName: this.state.data.last_name,
                    email: this.state.data.username,
                    avatar: this.state.data.avatar,
                    address: this.state.data.address,
                    zipCode: this.state.data.potsal_code,
                    phoneNumber: this.state.data.phone,
                    city: this.state.data.city
                })
                const usrCountry = [{ value: this.state.data.country, label: this.countryCode() }]

                this.setState({ country: usrCountry })
            })
            .catch(err => {
                console.log(err)
            })
        this.getAllCountry()
    }

    countryCode() {
        for (var i = 0; i < countrymap.length; i++) {
            var populate = countrymap[i]
            if (populate.value === this.state.data.country) {
                return populate.label
            }
        }
    }

    getAllCountry() {
        var countryData = []
        for (var i = 0; i < countrymap.length; i++) {
            var obj = countrymap[i]
            const dataMap = { value: obj.value, label: obj.label }
            countryData.push(dataMap)
        }
        this.setState({ listAllCountry: countryData })
    }

    //update data 

    updateFirstName(event) {
        this.setState({ firstName: event.target.value })
    }

    updateLastName(event) {
        this.setState({ lastName: event.target.value })
    }

    updateEmail(event) {
        this.setState({ Email: event.target.value })
    }

    updatePhoneNumber(event) {
        this.setState({ phoneNumber: event.target.value })
    }

    updateAddress(event) {
        this.setState({ address: event.target.value })
    }

    updateEmail(event) {
        this.setState({ email: event.target.value })
    }

    handleCountrySelect = (selectedOptions) => {
        this.setState({ country: selectedOptions })
    }

    updateCity(event) {
        this.setState({ city: event.target.value })
    }

    handlePostalCode(event) {
        this.setState({ zipCode: event.target.value })
    }

    handleSignOut() {
        localStorage.clear()
    }

    handlePhoto(event) {
        this.setState({ avatar: event.target.files[0] })
        // console.log(event.target.files[0])
    }

    // updatePhoto(event){
    //     event.preventDefault()
    //     var body = {
    //         avatar  : this.state.avatar
    //     }
    //     this.userDetail.uploadPhoto(body)
    // }

    updateData(event) {
        event.preventDefault()
        // if(this.userDetail.updateProfile())
        var body = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phone: this.state.phoneNumber,
            companyName: this.state.companyName,
            city: this.state.city,
            country: this.state.country[0].value,
            postalCode: this.state.zipCode
        }
        // console.log(body)
        this.userDetail.updateProfile(body)
        var photo = {
            avatar: this.state.avatar
        }
        this.userDetail.uploadPhoto(photo)
        if (!this.userDetail.updateProfile(body)) {
            return this.Alert.error('Failed to update profile')
        } else {
            return this.Alert.success('Susccess', 'Data profil berhasil disimpan')
        }




    }


    render() {
        var unverifiedAlert;
        if (this.state.data.status === 0) {
            unverifiedAlert = <div class="alert alert-primary" role="alert"> Akun anda belum diverifikasi. Kami telah mengirimkan email verifikasi saat anda melakukan pendaftaran. Silahkan cek email anda. </div>
        }

        return (
            <div className="userProfile">

                <div className="card rounded-top bg-white shadow mb-4 collapse show" id="userProfileForm">
                    {unverifiedAlert}
                    <div className="card-body rounded-top">
                        <form>
                            <div className="row" >
                                <div className="col-12 col-sm-6">
                                    <div className="form-group">
                                        <label forhtml="fullName">Nama Depan</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="first_name"
                                            placeholder={this.state.data.first_name}
                                            onChange={this.updateFirstName}
                                            defaultValue={this.state.firstName}
                                            required />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="form-group">
                                        <label forhtml="fullName">Nama Belakang</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder={this.state.data.last_name}
                                            onChange={this.updateLastName}
                                            defaultValue={this.state.lastName}
                                            required />
                                    </div>
                                </div>

                                <div className='col-12 col-md-6'>
                                    <div className="form-group">
                                        <label htmlFor="fullName">No Telepon</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder={this.state.data.phone}
                                            onChange={this.updatePhoneNumber}
                                            defaultValue={this.state.phoneNumber}
                                            required />
                                    </div>
                                </div>
                                <div className='col-12 col-md-6'>
                                    <div className='form-group'>
                                        <label htmlFor="input-file">Choose your image</label>
                                        <div className="input-group mb-3">
                                            <div className="custom-file">
                                                <input type="file"
                                                    className="custom-file-input"
                                                    id="inputGroupFile01"
                                                    aria-describedby="inputGroupFileAddon01"
                                                    onChange={this.handlePhoto}
                                                    placeholder={this.state.data.avatar} />
                                                <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">

                                    <div className="form-group">
                                        <label htmlFor="fullName">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder={this.state.data.email}
                                            onChange={this.updateEmail}
                                            defaultValue={this.state.email}
                                            required />
                                        <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="address">Alamat Lengkap</label>
                                        <textarea
                                            className="form-control"
                                            rows="5"
                                            placeholder={this.state.data.address}
                                            onChange={this.updateAddress}
                                            defaultValue={this.state.address}
                                            required />
                                    </div>
                                </div>
                                <div className='col-12 col-sm-4'>
                                    <label htmlFor="country">Country</label>
                                    <Select
                                      id="country"
                                      placeholder="Choose Country"
                                      options={this.state.listAllCountry}
                                      // value={this.state.country}
                                      onChange={this.handleCountrySelect}
                                      required="" />
                                </div>
                                <div className='col-12 col-sm-4'>
                                    <label htmlFor="zip">City</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="zip"
                                        placeholder={this.state.data.city}
                                        onChange={this.updateCity}
                                        value={this.state.city}
                                        required="" />
                                </div>
                                <div className='col-12 col-sm-4'>
                                    <label htmlFor="zip">Zip</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="zip"
                                        placeholder={this.state.data.postal_code}
                                        defaultValue={this.state.zipCode}
                                        onChange={this.handlePostalCode}
                                        required=""
                                    />
                                    <div className="invalid-feedback">
                                        Zip code required.
                                    </div>
                                </div>

                                <div className='col-4 offset-4'>
                                    <button onClick={this.updateData} className="btn btn-primary btn-block my-4" type="submit">Update Profile </button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}

export default CProfile;