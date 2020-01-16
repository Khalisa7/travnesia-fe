import React,{Component} from 'react'
import logo from './img/favicon.png'
import './style/sUserHeader.css'

class CUserHeader extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="user-header pt-4" >
                <img src={logo} alt="" className="mx-auto d-block shadow" width="100px"/>
            </div>
        );
    }
}

export default CUserHeader;