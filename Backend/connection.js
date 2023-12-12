const  mongoose = require("mongoose");

const uri = "mongodb+srv://netflix:netflix@netflixcluster.jsx5uxb.mongodb.net/todo?retryWrites=true&w=majority"


const connectToMongo = async()=>{

    await mongoose.connect(uri)
    console.log("Mongo Connected")
}

module.exports = connectToMongo;