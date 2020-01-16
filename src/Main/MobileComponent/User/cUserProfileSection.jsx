import React,{Component} from 'react'
import Dropzone from 'react-dropzone'
import './style/sUserProfileSection.css'
import { BrowserRouter as Router, Link } from "react-router-dom"
import ProfileDetail from '../../../_services/customers/ProfileDetail' 
import countrymap from '../../../_services/json_data/country-list.json'
import Alert from '../../../_services/alert/Alert'

class CUserProfileSection extends Component{
    constructor(props){
        super(props);
        this.state = {
            
            data : [],
            listAllCountry: [],
            
            //update from
            firstName : '',
            lastName  : '',
            phoneNumber: '',
            email       : '',
            address     : '',
            city        : '',
            zipCode     : '',
            country     : []
          }

        //backend
        this.userDetail = new ProfileDetail()
        this.Alert = new Alert()

        //bind
        this.countryCode = this.countryCode.bind(this)
        this.getAllCountry = this.getAllCountry.bind(this)

        this.updateFirstName = this.updateFirstName.bind(this)
        this.updateLastName = this.updateLastName.bind(this)
        this.updateAddress = this.updateAddress.bind(this)
        this.updatePhoneNumber = this.updatePhoneNumber.bind(this)
        this.updateEmail = this.updateEmail.bind(this)
        this.handlePostalCode = this.handlePostalCode.bind(this)
        this.handlePhoto = this.handlePhoto.bind(this)
        this.updateData = this.updateData.bind(this)

    }

    componentDidMount (){
        this.userDetail.getProfile()
        .then(res => {
            this.setState({ data : res.result })
            this.setState({
                firstName   : this.state.data.first_name,
                lastName    : this.state.data.last_name,
                email       : this.state.data.username,
                avatar      : this.state.data.avatar,
                address     : this.state.data.address,
                zipCode     : this.state.data.potsal_code,
                phoneNumber : this.state.data.phone,
                city        : this.state.data.city,
                avatar      : this.state.data.avatar
            })
            const usrCountry = [{ value: this.state.data.country, label: this.countryCode()}]

            this.setState({country: usrCountry})
        })
        .catch(error => console.log(error))
    }

    countryCode(){
        for(var i = 0; i<countrymap.length; i++){
            var populate = countrymap[i]
            if(populate.value === this.state.data.country){
                return populate.label
            }
        }
    }

    getAllCountry(){
        var countryData =[]
        for(var i=0; i< countrymap.length; i++){
            var obj = countrymap[i]
            const dataMap = { value: obj.value, label: obj.label}
            countryData.push(dataMap)
        }
        this.setState({listAllCountry: countryData})
    }


    updateFirstName(event){
        this.setState({firstName: event.target.value})
    }

    updateLastName(event){
        this.setState({lastName: event.target.value})
    }

    updateEmail(event){
        this.setState({Email: event.target.value})
    }

    updatePhoneNumber(event){
        this.setState({phoneNumber : event.target.value})
    }

    updateAddress(event){
        this.setState({ address: event.target.value})
    }

    updateEmail(event){
        this.setState({ email : event.target.value})
    }
    
    handleCountrySelect = (selectedOptions) =>{
        this.setState({ country : selectedOptions})
    }

    handleCity(event){
        this.setState({ city : event.target.value})
    }

    handlePostalCode(event){
        this.setState({ zipCode : event.target.value})
    }

    handleSignOut(){
        localStorage.clear()
    }

    handlePhoto(event){
        this.setState({ avatar : event.target.files[0]})
    }

    updateData(event){
        event.preventDefault()
        var body = {
            firstName   : this.state.firstName,
            lastName    : this.state.lastName,
            address     : this.state.address,
            phone       : this.state.phoneNumber,
            city        : this.state.city,
            country     : this.state.country[0].value,
            postalCode  : this.state.zipCode
        }
        // console.log(body)
        this.userDetail.updateProfile(body)
        let formData = new FormData()
        formData.append("file", this.state.avatar)
        this.userDetail.uploadPhoto(formData)
        if(!this.userDetail.updateProfile(body)){
            return this.Alert.error('Failed to update profile')
        }else{
            return this.Alert.success('Success', 'Data Success Updated')
        }
    }

    render(){
        return(
            <div className="user-home mb-4">
                <div className="card rounded-top bg-white border-0 shadow">
                    <div className="card-body rounded-top" >
                        <div className="clearfix">
                            <div className="float-left">
                                <div className="media">
                                    <div className="img-profile rounded align-self-center" >
                                        <img src={process.env.REACT_APP_CDN_CUSTOMER + this.state.data.avatar} alt=""/>
                                    </div>
                                    <div className="media-body ml-3">
                                        <h4 className="mb-0">{this.state.data.first_name + " " + this.state.data.last_name}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="float-right my-auto">
                                <Link to="/" onClick={this.handleSignOut}>
                                    <button className='btn btn-sm btn-info btn-block'>Sign Out</button>
                                </Link>
                                {/* <a href="/" className="btn btn-sm btn-info btn-block" onClick={this.handleSignOut}>Logout</a> */}
                            </div>
                            <div className="float-left my-auto">
                            <a href="" className="mt-0" data-toggle='collapse' data-target='#userProfileForm' aria-expanded='false' aria-controls='userProfileForm'>Edit Profile</a>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="card rounded-bottom border-0 shadow collapse" id="userProfileForm">
                    <div className="card-body rounded-top bg-white">
                        <div className="row">
                            <div className="col-md-12 mb-4">
                                <Dropzone
                                    accept="image/jpeg, image/png"
                                    onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }}
                                    className="bg-light p-5 border-danger rounded mt-4"
                                    style={{height:250+"px",width:100+"%",border:"dashed", float:"right"}}
                                    onChange={this.handlePhoto}
                                >
                                    <div className="text-center">
                                        <h6>
                                        Drop Your Image Here <br/> Or Click Down Bellow
                                        </h6>
                                        <br/>
                                        <button className="btn btn-sm btn-outline-primary">Browse File</button><br/>
                                        <label htmlFor="">
                                            {/* {
                                                this.state.accepted.map(f => {return f.name})
                                            } */}
                                        </label>
                                    </div>
                                </Dropzone>
                            </div>
                            <div className="col-md-12 mb-4">
                                <div className="form-group">
                                    <label htmlFor="txt_name">Nama Depan</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="txt_name" 
                                        placeholder={this.state.data.first_name} required
                                        onChange={this.updateFirstName}
                                        defaultValue={this.state.firstName} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="txt_name">Nama Belakang</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="txt_name" 
                                        placeholder={this.state.data.last_name} required
                                        onChange={this.updateLastName}
                                        defaultValue={this.state.lastName} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="txt_email">Alamat Email</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="txt_email" 
                                        placeholder={this.state.data.username} required 
                                        onChange={this.updateEmail}
                                        defaultValue={this.state.email} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="txt_address">Alamat</label>
                                    <textarea 
                                        name="txt_address" 
                                        id="txt_address" cols="30" rows="5" 
                                        placeholder={this.state.data.address} 
                                        className="form-control" required 
                                        onChange={this.updateAddress}
                                        defaultValue={this.state.address}
                                        ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="txt_telp">Nomor Telepon</label>
                                    <input 
                                        type="text" 
                                        className="form-control" id="txt_telp" 
                                        placeholder={this.state.data.phone} required
                                        onChange={this.updatePhoneNumber}
                                        defaultValue={this.state.phoneNumber} />
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-sm px-4 mt-2 btn-danger" onClick={this.updateData}>Update Profile</button> 
                                </div>
                            </div>
                        </div>
                    </div>
                        
                </div>
            </div>
        );
    }
}

export default CUserProfileSection; 