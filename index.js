require("dotenv").config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');
const { loginRequired, ensureCorrectUser } = require('./middleware/auth');
const db = require("./model");
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json())

// all my routes here
app.use("/api/auth", authRoutes);
app.use("/api/users/:id/messages", loginRequired, ensureCorrectUser, messagesRoutes);   // loginRequired, ensureCorrectUser are middleware

app.get("/api/messages", loginRequired, async function(req,res,next){
    try {
        let messages = await db.Message.find()
        .sort({createdAt: "desc"}) 
        .populate("user", {
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(messages)
    } catch (error) {
        return next(error)
    }
})

// if none of the routes are reached then
app.use(function(req,res,next){
    let err = new Error("Not Found")
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT}`);
})

