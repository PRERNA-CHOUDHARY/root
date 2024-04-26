import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import Booking  from '../models/BookingSchema.js'
import Stripe from 'stripe'

export const getCheckoutSession = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.doctorId)
        const user = await User.findById(req.userId)
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
        const   customer=stripe.Customer.create(
            email=request.POST["email"],
            name=request.POST["nickname"],
            source=request.POST["stripeToken"],
            )
            customer=stripe.Customer.modify(
                customer.id,
                address={"city":"mumbai","country":"india","line1":"unr","line2":"thane","postal_code":"421005","state":"maharashtra"},
            )
        
        const session = await stripe.checkout.sessions.create(
            {
                payment_method_types: ['card'],
                mode: 'payment',
                success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
                cancel_url: `${req.protocol}://${req.get('host')}/doctors/${doctor.id}`,
                customer_email: user.email,
                
                client_reference_id: req.params.doctorId,
                line_items:[ {
                    price_data: {
                        currency: 'INR',
                        unit_amount: doctor.ticketPrice,
                        product_data: {
                            name: doctor.name,
                            description: doctor.bio,
                            images:[doctor.photo]
                        }
                    },
                    quantity:1
                }],
                billing_address_collection: 'auto',
                shipping_address_collection: {
                     // Collect shipping address only for India
                },
                metadata: {
                    customer_name: user.name,
                }
                
            }
        )
        
        const booking = new Booking({
            doctor: doctor._id,
            user: user._id,
            ticketPrice: doctor.ticketPrice,
            session: session.id
            
        })
        await booking.save()
        res.status(200).json({success:true, message:"Successfully Paid",session})

    }

    catch (err) {
        console.log(err)
        res.status(500).json({success:false, message:"Error creating checkout session"})
    }
}