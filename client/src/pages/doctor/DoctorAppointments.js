import Layout from '../../components/Layout'
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import {Table,message} from 'antd'


const DoctorAppointments = () => {

    const [appointments,setAppointments]=useState([])
  
    const getAppointments=async()=>{
        try{
            const res=await axios.get('/api/v1/doctors/doctor-appointments',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`,
                }
            })
            if(res.data.success){
                setAppointments(res.data.data)
            }
        }catch(error){
            console.log(error)
        }
    }
  
    useEffect(()=>{
        getAppointments()
    },[])

    const handleStatus= async(record,status) =>{
        try{
            const res=await axios.post('/api/v1/doctors/update-status',{appointmentsId:record._id,status},
            {headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`,
            }})
            if(res.data.success){
                message.success(res.data.message)
                getAppointments();
            }
        }catch(error){
            console.log(error)
            message.error('Something Went wrong')
        }
    }

    const columns=[
        {
            title:'ID',
            dataIndex:'_id'
        },
        /*{
            title:'Name',
            dataIndex:'name',
            render:(text,record)=>(
                <span>
                    {record.doctorId.firstName} {record.doctorId.lastName}
                </span>
            )
        },
        {
            title:'Phone',
            dataIndex:'phone',
            render:(text,record)=>(
                <span>
                    {record.doctorInfo.phone}
                </span>
            )
        },*/
        {
            title:'Date and Time',
            dataIndex:'date',
            render:(text,record)=>(
                <span>
                   {moment(record.date).format("DD-MM-YYYY")} &nbsp;
                   {moment(record.TIME).format("hh:MM")}
                </span>
            )
        },
        {
            title:'Status',
            dataIndex:'status'
        },
        {
            tittle:'Actions',
            dataIndex:'actions',
            render:(text,record)=>(
                <div className='d-flex'>
                    {record.status==="pending" && (
                        <div className='d-flex'>
                            <button className='btn btn-success' onClick={()=>handleStatus(record,'Approve')}>Approve</button>
                            <button className='btn btn-danger ms-2' onClick={()=>handleStatus(record,'Reject')}>Reject</button>

                        </div>

                    )}
                </div>
            )
        }
    ]

  return (
    <Layout>
        <h1> Appoinments List</h1>
        <Table columns={columns} dataSource={appointments}></Table>
    </Layout>
  )
}

export default DoctorAppointments
