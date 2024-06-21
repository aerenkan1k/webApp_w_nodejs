const mongoose = require("mongoose");
const siteSchema = new mongoose.Schema({
    homeImage:{type:String,required:"Boş olamaz"},
    aboutImage:{type:String,required:"Boş olamaz"},
    contactImage:{type:String,required:"Boş olamaz"},
    signinImage:{type:String,required:"Boş olamaz"},
})