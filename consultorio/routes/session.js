
/*
 * GET patients listing.
 */
 
 // loads model file and engine
var _ = require('underscore');

exports.getSessionInformation = function(req, res){
	var blackList = ['password' , 'salt'];
    res.json(_.omit(req.user.toObject(),blackList));
};
