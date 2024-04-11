const appointmentModel = require('../models/appointmentModel');
const doctorModel=require('../models/doctorModel');
const userModel = require('../models/userModels');
const getDoctorInfoController=async(req,res)=>{
    try{
        const doctor=await doctorModel.findOne({userId:req.body.userId})
        res.status(200).send({message:'Doctor Details fetch successful',success:true,data:doctor})
    }catch(eroor){
        console.log(error);
        res.status(500).send({message:'Error in fetching details',success:false,error});
    }
}

const updateProfileController=async(req,res)=>{
    try{
        const doctor=await doctorModel.findOneAndUpdate({userId:req.body.userId},req.body)
        res.status(200).send({
            success:true,
            message:'Profile updated successfully',
            data:doctor
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while updating profile'
        })
    }
}
//get single doc
const getDoctorByIdController=async(req,res)=>{
    try{
        const doctor=await doctorModel.findOne({_id:req.body.doctorId})
        res.status(200).send({message:'Doctor Details fetch successful',success:true,data:doctor})
    }catch(error){
        console.log(error);
        res.status(500).send({message:'Error in fetching details',success:false,error});
    }
}

const doctorAppointmentsController=async(req,res)=>{
    try{
        const doctor=await doctorModel.findOne({ userId : req.body.userId});
        const appointments=await appointmentModel.find({doctorId:doctor._id,})
        res.status(200).send({message:'Doctor Appointments fetch successful',success:true,data:appointments})
    }catch(error){
        console.log(error);
        res.status(500).send({message:'Error in Doc Appointments',success:false,error});
    }

}


const updateStatusController=async(req,res)=>{
    try{
        const {appointmentsId,status} =req.body
        const appointments=await appointmentModel.findByIdAndUpdate(appointmentsId,{status})
        const user=await userModel.findOne({_id:appointments.userId})
        const notification=user.notification
        notification.push({
            type:'Status-Updated',
            message:`Your Appointment has been updated ${status}`,
            onClickPath:'/doctor-appointments'
        })
        await user.save()
        res.status(200).send({message:'Appointment Status Updated',success:true})
    }catch(error){
        console.log(error);
        res.status(500).send({message:'Error in updating status',success:false,error});
    }
}

module.exports={getDoctorInfoController,updateProfileController,getDoctorByIdController,doctorAppointmentsController,updateStatusController};