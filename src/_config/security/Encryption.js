const Cryptr = require('cryptr')
const crypt = new Cryptr('' + process.env.ENCRYPT_HASH + '')
 
export default class Encryption{
	encrypt(payload){
		if(payload) {
			const encryptedString = crypt.encrypt(payload)
			if(encryptedString){
				return encryptedString
			}
		}else{
			return false
		}
	}

	decrypt(payload){
		if(payload) {
			const decryptedString = crypt.decrypt(payload)
			if(decryptedString){
				return decryptedString
			}
		}else{
			return false
		}
	}
}
