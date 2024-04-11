const mongoose = require('mongoose');

const doctorSchema=new mongoose.Schema({
    userId:{
        type:String,
    },
    firstName:{
        type:String,
        required:[true,'firstName is required']
    },
    lastName:{
        type:String,
        required:[true,'lastName is required']
    },
    phone:{
        type:String,
        required:[true,'phone is required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    website:{
        type:String,
        
    },
    address:{
        type:String,
        required:[true,"Address is required"]
    },
    specialization:{
        type:String,
        required:[true,"Specialization is required"]
    },
    experience:{
        type:String,
        required:[true,"Experience is required"]
    },
    feesPerConsultation:{
        type:Number,
        required:[true,"FeesPerConsultationi is required"]
    },
    status:{
        type:String,
        default:'pending'
    },
    timings:{
        type:Object,
        required:[true,"Work Timings are required"]
    }
},
{timestamps:true}
);

const doctorModel = mongoose.model('doctors',doctorSchema)
module.exports=doctorModel