/**
 * @author DanielAlejandro
 */

module.exports.hash = function (pass, salt) {
	var crypto	= require('crypto');
	var h = crypto.createHash('sha512');
	
	h.update(pass);
	h.update(salt);
	
	return h.digest('base64');
};

module.exports.createSalt = function(size){
	size = size || 64; 
	var crypto	= require('crypto');
	return crypto.randomBytes(size).toString('base64')
} 