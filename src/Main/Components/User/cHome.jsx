import React,{Component} from 'react';
import './style/sHome.css'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import HomeManifest from '../../../_services/home/HomeManifest.js'
import Translations from '../../../localization/translations.js'
import LocalizedStrings from 'react-localization'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class CHome extends Component {

    constructor () {
        super()
        this.state = {
            data: []
        }

        this.Manifest = new HomeManifest()

        //Translations
	    this.Translations = new Translations()
	    var Locale = this.Translations.locale()
	    this.langCode = cookies.get('lang')
	    this.lang = new LocalizedStrings({Locale})
    }

    componentDidMount(){
        this.Manifest.popularDestination()
        .then(res => {
            let data_map = res.result.map((data) => {
                return data
            })
            this.setState({ data : data_map })
        })
        .catch(err => {
            return false
        })
    }

    componentWillUnmount(){
        this.setState({
            data : null
        })
    }
	
	getDesc(data_map){
		if ( this.langCode == 'id' ) {
			var popular_desc = data_map.short_desc.id
		} else if (this.langCode == 'en') {
			var popular_desc = data_map.short_desc.en
		} else if (this.langCode == 'an') {
			var popular_desc = data_map.short_desc.an
		} else if (this.langCode == 'zh') {
			var popular_desc = data_map.short_desc.zh
		} else {
			var popular_desc = data_map.short_desc.en
		}
		
		return popular_desc
	}

    render () {
        return (
            <div className='container userHome'>
                <div className='page-heading'>
                    <div className='text-center'>
                        <h3>{ this.lang.top_destination }</h3>
                        <p>{ this.lang.top_destination_desc }</p>
                    </div>
                </div>
	            <div className="row">
		            { this.state.data.map( ( data_map, i) => {
			
			            if ( data_map.type == 1 ) {
				            var featured = 'col-md-8'
			            } else {
				            var featured = 'col-md-4'
			            }
			
			            return(
				            <div className={ featured + " block padding-5"} key={i}>
					            <a href={process.env.PUBLIC_URL + 'city/' + data_map.slug}>
						            <div className='card h-230'>
							            <div className='card-counter'>
								            { data_map.availablePackage + this.lang.available_package}
							            </div>
							            <img src={process.env.REACT_APP_CDN_PRODUCT + data_map.image} alt={ data_map.name }/>
							            <div className='card-caption'>
								            <h5>{ data_map.name }</h5>
								            <p>{ this.getDesc(data_map) }</p>
							            </div>
						            </div>
					            </a>
				            </div>
			            )
		            })}
	            </div>
                <br />
                <div className='row justify-content-center'>
                    <div className='form-group'>
                        <div className='input-group'>
                            <a className='btn btn-danger' href='' >{ this.lang.more_top_destination_btn }</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CHome
