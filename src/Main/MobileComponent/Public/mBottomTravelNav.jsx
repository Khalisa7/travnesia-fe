import React,{Component} from 'react'
import { Link } from "react-router-dom";
import Translations from '../../../localization/translations.js'
import LocalizedStrings from 'react-localization'

class MBottomTravelNav extends Component{
    constructor(props){
        super(props)
        this.state = {}

        //Get Translations
        this.Translations = new Translations()
        var translate = this.Translations.locale()
        this.lang = new LocalizedStrings({translate});
        
    }

    render(){
        return(
            <footer className="fixed-bottom bottom-menu bottom-top">
                <div className="row ">
                    <div className="col-6 text-center">
                        <i className="fa fa-lg fa-search f-primary-color"></i>
                        <div className="bottom-menu-title">Ganti Pencarian</div>
                    </div>
                    <div className="col-6 text-center">
                        <i className="fa fa-lg fa-align-left f-primary-color"></i>
                        <div className="bottom-menu-title">Filter</div>
                    </div>
                </div>  
            </footer>
        );
    }
}

export default MBottomTravelNav