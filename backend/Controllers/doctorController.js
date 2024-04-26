import Doctor from "../models/DoctorSchema.js"; 
import Booking from "../models/BookingSchema.js";
// import {populate} from "./reviewController.js"
export const updateDoctor = async (req, res) => {
    const id = req.params.id
    try {
        const updateDoctor = await Doctor.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true });
        res.status(200).json({ sucess: true, message: 'Sucessfully Updated', data: updateDoctor })
    } catch {
        res.status(500).json({ sucess: false, message: ' Failed to Update' })

    }
}
export const deleteDoctor = async (req, res) => {
    const id = req.params.id
    try {
        const updateDoctor = await Doctor.findByIdAndDelete(id);
        res.status(200).json({ sucess: true, message: 'Sucessfully Deleted'})
    } catch {
        res.status(500).json({ sucess: false, message: ' Failed to Delete' })

    }
}
export const getSingleDoctor = async (req, res) => {
    const id = req.params.id
    try {
        const doctor = await Doctor.findById(id).populate('reviews').select("-password");
        res.status(200).json({ sucess: true, message: 'Doctor Found',data:doctor})
    } catch {
        res.status(404).json({ sucess: false, message: 'No Doctor found' })

    }
}
export const getAllDoctor = async (req, res) => {
    
    try {
        const { query } = req.query;
        let doctors;
        if (query) {
            doctors = await Doctor.find({
                isApproved: 'approved'
                , $or: [{ name: { $regex: query, $options: 'i' } },
                    {specialization:{$regex:query,$options:'i'}}
                ],
            }).select('-password')
        } else {
            doctors= await Doctor.find({}).select("-password");
            
        }

        res.status(200).json({ sucess: true, message: 'Doctors Found',data:doctors})
    } catch {
        res.status(404).json({ sucess: false, message: 'No Doctor found' })

    }
}

export const doctorProfile = async(req, res) => {
    const doctorId = req.userId

    try {
        const doctor = await Doctor.findById(doctorId)

        if(!doctor) {
            return res.status(404).json({success:false, message:'Doctor not found'})
        }

        const {password, ...rest} = doctor._doc
        const appointments = await Booking.find({doctor:doctorId})

        res.status(200).json({success:true, message:'Doctor profile found', data:{...rest, appointments}})

    } catch (err) {
        res.status(500).json({success:false, message:"sorry, cannot get"})
    }
}