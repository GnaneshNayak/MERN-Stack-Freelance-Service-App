import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoute from './routes/auth.route.js';
import conversationRoute from './routes/conversation.route.js';
import gigRoute from './routes/gig.route.js';
import messageRoute from './routes/message.route.js';
import orderRoute from './routes/order.route.js';
import reviewRoute from './routes/review.route.js';
import userRoute from './routes/user.route.js';
const app = express();
dotenv.config();
mongoose.set('strictQuery', true);

// console.log(process.env.STRIPE_KEY);

const connect = async () => {
  await mongoose
    .connect(process.env.MONGO)
    .then((res) => console.log('Connected to mongoDB!'))
    .catch((err) => console.log(err));
};

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       'img-src': ["'self'", 'data:'], // Allowing 'data:' for inline images
//       'frame-src': ["'self'", 'http://127.0.0.1:5173/', 'https:'],
//       // Add other CSP directives as needed
//     },
//   }),
// );
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept',
//   );
//   next();
// });

// app.use(
//   cors({
//     origin: process.env.FRONTEND_NUMBER,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Include PUT in the allowed methods
//     credentials: true, // Allow credentials (e.g., cookies)
//     allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
//   }),
// );

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       'connect-src': ["'self'", 'https://checkout.stripe.com'],
//       'frame-src': ["'self'", 'https://checkout.stripe.com'],
//       'script-src': ["'self'", 'https://checkout.stripe.com'],
//       'img-src': ['https://*.stripe.com'],
//       // Add other directives as needed
//     },
//   }),
// );

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTENT_LINK, credentials: true }));

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/gigs', gigRoute);
app.use('/api/orders', orderRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messageRoute);
app.use('/api/reviews', reviewRoute);
app.get('/', (req, res) => {
  res.send('hello');
});
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';

  return res.status(errorStatus).send(errorMessage);
});

app.listen(8000, () => {
  connect();
  console.log('Backend server is running!');
});
