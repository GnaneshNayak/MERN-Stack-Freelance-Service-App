import createError from '../utils/createError.js';
import Gig from '../models/gig.model.js';
import Order from '../models/order.model.js';
import Stripe from 'stripe';

export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_KEY);

  const gig = await Gig.findById(req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: paymentIntent.id,
  });

  await newOrder.save();

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
};

// export const createOrder = async (req, res, next) => {
//   try {
//     const gig = await Gig.findById(req.params.gigId);

//     const newOrder = new Order({
//       gigId: gig._id,
//       image: gig.cover,
//       title: gig.title,
//       buyerId: req.userId,
//       sellerId: gig.userId,
//       price: gig.price,
//       payment_intent: 'temporary',
//     });

//     await newOrder.save();
//     res.status(201).send('successful');
//   } catch (err) {
//     next(err);
//   }
// };
export const getOrders = async (req, res, next) => {
  // console.log('gig', gig.buyerId);
  // console.log(req.userId);
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};
export const confirm = async (req, res, next) => {
  // console.log('gig', gig.buyerId);
  // console.log(req.userId);
  try {
    const orders = await Order.findOneAndUpdate(
      { payment_intent: req.body.payment_intent },
      {
        $set: {
          isCompleted: true,
        },
      },
    );

    res.status(200).send('order as been confirmed');
  } catch (err) {
    next(err);
  }
};
