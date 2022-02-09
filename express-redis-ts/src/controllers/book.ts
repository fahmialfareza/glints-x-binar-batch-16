import { Request, Response, NextFunction } from 'express';

import redisClient from '../db/redis';
import Book from '../models/book';

export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.create(req.body);

    const redis = await redisClient();
    await redis.set(`book:${book._id}`, JSON.stringify(book));

    res.status(201).json({ book });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const detailsBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const redis = await redisClient();

    let bookRedis = await redis.get(`book:${req.params.id}`);
    let book: any;
    if (bookRedis) {
      book = JSON.parse(bookRedis);
    } else {
      book = await Book.findById(req.params.id);

      if (book) {
        await redis.set(`book:${book._id}`, JSON.stringify(book));
      } else {
        return res.status(404).json({ error: 'Book not found' });
      }
    }

    res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ error });
  }
};
