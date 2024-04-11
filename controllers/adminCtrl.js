const doctorModel=require('../models/doctorModel')
const userModel=require('../models/userModels')

const getAllUsersController= async(req,res) => {
    try{
        const users=await userModel.find({})
        res.status(200).send({message:'Users Data List',success:true,data:users})
    }catch(error){
        console.log(error)
        res.status(500).send({message:'Error while fetching users',success:false,error})
    }
}

const getAllDoctorsController=async(req,res)=>{
    try{
        const doctors=await doctorModel.find({});
        res.status(200).send({message:'Doctors Data List',success:true,data:doctors,})
    }catch(error){
        console.log(error)
        res.status(500).send({message:'Error while fetching Doctors',success:false,error})
    }
}

//Doc acc STatus
const changeAccountStatusController=async(req,res)=>{
    try{
        const {doctorId,status}=req.body
        const doctor=await doctorModel.findByIdAndUpdate(doctorId,{status})
        const user=await userModel.findOne({_id: doctor.userId})
        const notification=user.notification
        notification.push({
            type:'doctor-account-request-updated',
            message:`Your Doctor Request has ${status}`,
            onClickPath:'/notification'
        })
        user.isDoctor = (status === "Approved") ?  true : false;
        await user.save()
        res.status(201).send({message:'Account Status Updated',success:true,data:doctor,})
    }catch(error){
        console.log(error)
        res.status(500).send({message:'Error in account status',success:false,error})
    }
}

module.exports = {getAllDoctorsController,getAllUsersController,changeAccountStatusController}