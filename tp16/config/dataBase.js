const mongoose = require("mongoose");



const conectDataBase =  (URL) => {
    try{
    mongoose.connect(URL)}
    catch(err){
        console.log(err)
    }
}

module.exports = conectDataBase;
