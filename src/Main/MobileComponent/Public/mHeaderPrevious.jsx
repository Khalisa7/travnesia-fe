import React, { Component } from 'react';
import './style/sMobileHeaderPrevious.css';

const MHeaderPrevious = (props) =>{
    return (
        <div className=" navbar-expand-lg fixed-top shadow-sm">
            <div className="header-previous">
                <div className="header-back">
                    <MBAR url={props.url || false}/>
                </div>
                <h5>{props.page}</h5>
            </div>
        </div>
    );
};

class MBAR extends Component {
    constructor(props){
        super(props)
        this.url = props.url || false
        if(props.url){
            this.url = true
        }
        this.state = {
            url: false
        }
    }

    componentDidMount(){
        this.setState({
            url : this.url
        })
    }


    goback(){
        return window.history.back()
    }

    goHome(){
        window.location = process.env.PUBLIC_URL
    }

    render() {
        var redirect = this.goback
        if(this.url){
            redirect = this.goHome
        }
        return (
        <div onClick={ redirect }>
            <i className="fa fa-arrow-left" />
        </div>
        );
    }
}

export default MHeaderPrevious;