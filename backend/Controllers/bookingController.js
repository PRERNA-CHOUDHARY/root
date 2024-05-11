/**
 * The booking controller has the following functions:
 *
 * getCheckoutSession: Get the checkout session.
 */

// Get the stripe module.
import Stripe from "stripe";

// Get the User, Doctor, and Booking models.
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";

// Get the checkout session.
export const getCheckoutSession = async (req, res) => {
  try {
    // Find the doctor and user by id.
    const doctor = await Doctor.findById(req.params.doctorId);
    const user = await User.findById(req.userId);

    // Create a new stripe instance.
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const stripeCustomer = await stripe.customers.create({
      email: user?.email || "prerna@gmail.com", // If user is not logged in, use a dummy email.
      name: user?.name || "Prerna Choudhary", // If user is not logged in, use a dummy name.
    });

    // Create a new checkout session.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/doctors/${doctor.id}`,
      client_reference_id: req.params.doctorId,
      customer: stripeCustomer.id,
      currency: "USD",
      line_items: [
        {
          price_data: {
            currency: "USD",
            unit_amount: doctor.ticketPrice,
            product_data: {
              name: doctor.name,
              description: doctor.bio,
              images: [doctor.photo],
            },
          },
          quantity: 1,
        },
      ],
      billing_address_collection: "required",
    });

    // Create a new booking.
    const booking = new Booking({
      doctor: doctor._id,
      user: user?._id || "662b8321e3c1c4a208ab3be6", // If user is not logged in, use a dummy user id (Purnita's).
      ticketPrice: doctor.ticketPrice,
      session: session.id,
    });
    await booking.save();
    res
      .status(200)
      .json({ success: true, message: "Successfully Paid", session });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error creating checkout session" });
  }
};
