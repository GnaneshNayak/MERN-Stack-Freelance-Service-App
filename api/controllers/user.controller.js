import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import createError from '../utils/createError.js';

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, 'You delete only your account!'));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send('deleted');
};

export const getUser = async (req, res, next) => {
  console.log(req.params.id);
  const user = await User.findById(req.params.id);

  const { password, ...info } = user._doc;

  res.status(200).send(info);
};
