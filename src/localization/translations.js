import Cookies from 'universal-cookie';
import iplocation from "iplocation";
const cookies = new Cookies();

export default class Translations {

	// Initializing default language
	constructor () {
		this.lang = cookies.get('lang')
		this.checkIp()	
	}

	checkIp() {
		iplocation('118.96.159.190')
		.then((res) => {
			if ( res.countryCode === 'ID') {
				cookies.set('lang', 'id', { path: '/' });
			}else{
				cookies.set('lang', 'en', { path: '/' });
			}
		})
		.catch(err => {
			return err
		});
	}

	checkLangFile() {
		try
		{
			return require('./locales/' + this.lang + "/" + this.lang + '.json')
		}
		catch (err)
		{
			return false;
		}
	}

	locale() {
		var setLang = this.checkLangFile();
		if(setLang) {
			const getLang = require('./locales/' + this.lang + "/" + this.lang + '.json')
			var lang = getLang
		}else{
			var lang = require('./locales/id/id.json')
		}
		return lang
	}
}
