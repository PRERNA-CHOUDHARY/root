import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
export const updateUser = async (req, res) => {
    const id = req.params.id
    try {
        const updateUser = await User.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true });
        res.status(200).json({ sucess: true, message: 'Sucessfully Updated', data: updateUser })
    } catch {
        res.status(500).json({ sucess: false, message: ' Failed to Update' })

    }
}
export const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        const updateUser = await User.findByIdAndDelete(id);
        res.status(200).json({ sucess: true, message: 'Sucessfully Deleted'})
    } catch {
        res.status(500).json({ sucess: false, message: ' Failed to Delete' })

    }
}
export const getSingleUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id).select("-password");
        res.status(200).json({ sucess: true, message: 'User Found',data:user})
    } catch {
        res.status(404).json({ sucess: false, message: 'No user found' })

    }
}
export const getAllUser = async (req, res) => {
    
    try {
        const user = await User.find({}).select("-password");
        res.status(200).json({ sucess: true, message: 'Users Found',data:user})
    } catch {
        res.status(404).json({ sucess: false, message: 'No user found' })

    }
}



export const getUserProfile = async(req, res) => {
    const userId = req.userId

    try {
        const user = await User.findById(userId)

        if(!user) {
            return res.status(404).json({success:false, message:'User not found'})
        }

        const {password, ...rest} = user._doc

        res.status(200).json({success:true, message:'Profile found', data:{...rest}})

    } catch (err) {
        res.status(500).json({success:false, message:"cannot get"})
    }
}

export const getMyAppointments = async(req, res) => {
    try {
        const bookings = await Booking.find({user:req.userId})
        const doctorId = bookings.map(el => el.doctor.id)
        const doctors = await Doctor.find({_id: {$in:doctorId}}).select('-password')
        res.status(200).json({success:true, message:"Appointments being fetched", data:doctors})
    } catch (err) {
        res.status(500).json({success:false, message:"cannot get"})
    }
}