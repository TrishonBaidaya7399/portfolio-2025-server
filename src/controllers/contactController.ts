import { Request, Response } from 'express';
import Message from '../models/Message';
import Analytic from '../models/Analytic';

export const createContact = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, message } = req.body;
    const newMessage = new Message({ name, email, phone, message });
    await newMessage.save();

    // Update analytics
    await Analytic.updateOne({}, { $inc: { messages: 1 } }, { upsert: true });

    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send message', error: (error as Error).message });
  }
};