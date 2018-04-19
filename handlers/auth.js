const db = require("../model");
const jwt = require("jsonwebtoken");

exports.signin = async function(req,res,next){
    //finding a user
    try {
        let user = await db.User.findOne({
            email: req.body.email
        });
        let {id, username, profileImageUrl} = user;
        let isMatch = await user.comparePassword(req.body.password);
        
        if(isMatch){
            
            
            let token = jwt.sign(
                {
                    id,
                    username,
                    profileImageUrl
                },
                process.env.SECRET_KEY 
            );
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        }else{
            console.log("it is false")
            return next({
                status: 400,
                message: "Invalid Email or Password"
            });
        }

    } catch (e) {
        return next({ status: 400, message: "Invalid Email/Password." });
    }
   
};

exports.signup = async function(req, res, next){
    try {
        // create a user
        // assign a token (signin token)
        // process.env.SECRET_KEY

        let user = await db.User.create(req.body)
        let{id, username, profileImageUrl} = user
        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        }, process.env.SECRET_KEY)

        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        })

    } catch (err) {
        // check what kind of error
        // if its a certain error
        // respond with username/email already taken
        // else send a generic 400

        if(err.code === 11000){       // 11000 when a validation fails
            err.message = "Sorry, that username and/or email is taken";
        }
        return next({
                status: 400,
                message: err.message
        })
    }
}