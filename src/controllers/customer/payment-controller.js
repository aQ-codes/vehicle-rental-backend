import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const prisma = new PrismaClient();

// Initialize Razorpay instance with your keys
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a Razorpay order
export const createOrder = async (req, res) => {
  try {
    const { bookingId, amount, currency } = req.body;

    // Verify the booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Set Razorpay order options
    const options = {
      amount: amount * 100, // Convert to paise for INR
      currency: currency || 'INR',
      receipt: `receipt_order_${bookingId}_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ orderId: order.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating order', error });
  }
};

// Verify Razorpay payment signature
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

    // Generate signature and verify it matches the Razorpay signature
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === razorpay_signature) {
      // Payment is verified, begin transaction
      const result = await prisma.$transaction(async (tx) => {
        
        // Check if the booking has already been confirmed (concurrency handling)
        const booking = await tx.booking.findUnique({
          where: { id: bookingId },
        });

        if (!booking || booking.status === 'Confirmed') {
          return { status: 'error', message: 'Booking already confirmed or not found' };
        }

        // Update booking status to confirmed
        const updatedBooking = await tx.booking.update({
          where: { id: bookingId },
          data: { status: 'Confirmed' },
        });

        // Log payment details in the Payment table
        const payment = await tx.payment.create({
          data: {
            bookingId: updatedBooking.id,
            amount: updatedBooking.amount,
            paymentMethod: 'Razorpay',
            paymentDate: new Date(),
            status: 'Completed',
          },
        });

        // Create reservation entry for the confirmed booking
        await tx.reservation.create({
          data: {
            bookingId: updatedBooking.id,
            vehicleId: booking.variantId,
            customerId: booking.customerId,
            startDate: booking.pickupDate,
            endDate: booking.dropoffDate,
            status: 'Reserved',
          },
        });

        return { status: 'success', booking: updatedBooking, payment };
      });

      if (result.status === 'success') {
        res.status(200).json({ message: 'Payment verified and booking confirmed', data: result });
      } else {
        res.status(400).json({ message: result.message });
      }
    } else {
      res.status(400).json({ message: 'Invalid signature, payment verification failed' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error verifying payment', error });
  }
};
