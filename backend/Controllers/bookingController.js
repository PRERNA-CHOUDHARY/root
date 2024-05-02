import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import Booking from '../models/BookingSchema.js';
import Stripe from 'stripe';

export const getCheckoutSession = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.doctorId);
        const user = await User.findById(req.userId);
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        const stripeCustomer = await stripe.customers.create({
            email: user?.email || "kartik@gmail.com",
            name: user?.name || "Default User",
            // address: {
            //     line1: user?.address?.line1 || "Default Address Line 1",
            //     city: user?.address?.city || "Queensland",
            //     state: user?.address?.state || "Queensland",
            //     country: 'IN',
            //     postal_code: user?.address?.postal_code || "4650"
            // }
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
            cancel_url: `${req.protocol}://${req.get('host')}/doctors/${doctor.id}`,
            client_reference_id: req.params.doctorId,
            customer: stripeCustomer.id,
            currency: 'USD',
            line_items: [{
                price_data: {
                    currency: 'USD',
                    unit_amount: doctor.ticketPrice,
                    product_data: {
                        name: doctor.name,
                        description: doctor.bio,
                        images: [doctor.photo]
                    }
                },
                quantity: 1
            }],
            billing_address_collection: 'required'
        });

        const booking = new Booking({
            doctor: doctor._id,
            user: user?._id || "662b8321e3c1c4a208ab3be6",
            ticketPrice: doctor.ticketPrice,
            session: session.id
        });
        await booking.save();
        res.status(200).json({ success: true, message: "Successfully Paid", session });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error creating checkout session" });
    }
};