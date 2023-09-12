import Gig from '../models/gig.model.js';
import createError from '../utils/createError.js';

export const createGig = async (req, res, next) => {
  if (!req.isSeller) next(createError(403, 'Only Sellers can create gig!'));
  // console.log(req.body);
  const newGig = await Gig({
    userId: req.userId,
    ...req.body,
  });
  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    next(err);
  }
};
export const deleteGig = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const gig = await Gig.findById(req.params.id);
    if (req.userId !== gig.userId)
      return next(createError(403, 'You can delete only your gig!'));
    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send('Gig as been deleted!');
  } catch (err) {
    next(err);
  }
};

export const getSingleGig = async (req, res, next) => {
  // console.log(req.params.id);
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, 'No gig found!'));
    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};

export const getGigs = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: { $regex: q.cat, $options: 'i' } }),
    ...((q.min || q.max) && {
      price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) },
    }),
    ...(q.search && { title: { $regex: q.search, $options: 'i' } }),
  };
  // console.log({ [q.sort]: -1 });
  // console.log(q.sort);
  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};
