import React, {Component} from 'react';
import './style/sBlog.css';
import Translations from './../../../localization/translations.js'
import LocalizedStrings from 'react-localization'

class CBlog extends Component{
    constructor(props){
        super(props)
        this.state = {
            mobile: false
        }

         //Translations
         this.Translations = new Translations()
         var Locale = this.Translations.locale()
         this.lang = new LocalizedStrings({Locale})
    }


    render() {
        return(
            <div className="blog">
                <div className="container">
                    <div className='page-heading'>
                        <div className='text-center'>
                            <div className='text-center'>
                                <span><i className='fa fa-star' /></span>
                                <span><i className='fa fa-star star-midle' /></span>
                                <span><i className='fa fa-star' /></span>
                            </div>
                            <h3>{ this.lang.blog_heading_title }</h3>
                            <hr />
                            <p>Explore some of the best tips from around the world from our partners and friends.</p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-3">
                            <a href="#">
                                <div className="image-blog shadow-lg travnesia-blog text-center">
                                    <p><span>TN Blog</span><br/>Lorem Ipsum</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-3">
                            <a href="#">
                                <div className="image-blog shadow-lg tips-trick text-center">
                                    <p><span>Trick and Tips</span><br/>Lorem Ipsum</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-3">
                            <a href="#">
                                <div className="image-blog shadow-lg suggest-plane text-center">
                                    <p><span>Suggested Airplane</span><br/>Garuda Indonesia</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-3">
                            <a href="#">
                                <div className="image-blog shadow-lg mobile-phone text-center">
                                    <p><span>Mobile App</span><br/>Download Mobile App</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CBlog;
