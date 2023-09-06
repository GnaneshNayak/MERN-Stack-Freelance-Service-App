import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(typeof id);

  const user = await User.findById(req.params.id);
  console.log(user);

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send('Your not authenticated!');

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (payload.id !== user._id.toString()) {
      return res.status(401).send('Your not Owner!');
    }
    await User.findByIdAndDelete(req.params.id)
    res.status(200).send('deleted'),
    
  });
};
