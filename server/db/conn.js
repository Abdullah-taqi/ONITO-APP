const mongoose = require("mongoose");

const DB = "mongodb+srv://ataqi99:hospital@cluster0.ecppwxa.mongodb.net/onito?retryWrites=true&w=majority"


mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("connection start")).catch((error)=> console.log(error.message));