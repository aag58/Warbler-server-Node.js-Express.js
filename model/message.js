const mongoose = require("mongoose");
const User = require("./user");


const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 160
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"   // should match the name of the model
    }
}, {
    timestamps: true
})
 

messageSchema.pre('remove', async function(next){      // cannot use arrow function here as we need correct value of this.
    try { 
        // find a user
        let user = await User.findById(this.user)
        // remove a id from their messages list
        user.messages.remove(this.id);
        // save that user 
        await user.save()
        // and return next
        return next();   

    } catch (error) {
        return next(error)
    }
})

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;