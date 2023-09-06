import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send('user created');
  } catch (err) {
    res.status(500).send('something went wrong');
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    if (!user) return res.status(404).send('User not found');
    const isCorrect = bcrypt.compareSync(password, user.password);
    if (!isCorrect) return res.status(400).send('Wrong password or username');

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY,
    );

    const { password: userPassword, ...info } = user._doc;

    res
      .cookie('accessToken', token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    console.log(err);
    res.status(500).send('something went wrong');
  }
};

export const logout = (req, res) => {
  try {
  } catch (err) {
    res.status(500).send('somthng went wrong in logout');
  }
};
