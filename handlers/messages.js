const db = require("../model");


//   /api/users/:id/messages
exports.createMessage = async function (req,res,next){
    try {
        let message = await db.Message.create({
            text: req.body.text,
            user: req.params.id
        })
        let foundUser = await db.User.findById(req.params.id)
        foundUser.messages.push(message.id);
        await foundUser.save()
        let foundMessage = await db.Message.findById(message._id).populate("user", {
            username: true,
            profileImageUrl: true
        })
        return res.status(200).json(foundMessage)
    } catch (error) {
        return next(error)
    }
}

// GET api/users/:id/messages/:message_id
exports.getMessage = async function (req,res,next){
    try {
        let message = await db.Message.findById(req.params.message_id);
        return res.status(200).json(message)

    } catch (error) {
        return next(error);
    }
};


// DELETE api/users/:id/messages/:message_id
exports.deleteMessage = async function (req,res,next){
    
    let foundMessage = await db.Message.findById(req.params.message_id);
    await foundMessage.remove()
    return res.status(200).json(foundMessage);    
}