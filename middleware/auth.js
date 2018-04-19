require('dotenv').load();
const jwt = require('jsonwebtoken');

// Make sure the user is logged in - Authenctication
exports.loginRequired = function(req, res, next){
    try {
        const token = req.headers.authorization.split(" ")[1];  // req.headers.authorization will return something like->> Bearer hakjkjhkjdshksjdh so we use split(" ") and get the value at 1st index
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded){
                return next();
            }else{  // if the token id not get decoded
                return next({
                    status: 401,
                    message: "Please log in first"
                })
            }
        })
    } catch (error) {
        return next({status: 401, message: "Please log in first"});
        
    }


};

// Make sure we get the correct user - Authorization

exports.ensureCorrectUser = function(req,res,next){
    try {
        const token =  req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err,decoded){
            if(decoded && decoded.id === req.params.id){
                return next()
            }
            else{  // if the token id not get decoded
                return next({
                    status: 401,
                    message: "Unauthorized"
                })
            }
        })
    } catch (error) {
            return next({ status: 401, message: "Unauthorized"})
    }
};
