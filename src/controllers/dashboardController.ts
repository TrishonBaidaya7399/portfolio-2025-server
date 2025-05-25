import { Request, Response } from 'express';
import Analytic from '../models/Analytic';

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const analytics = await Analytic.findOne();
    if (!analytics) return res.status(404).json({ success: false, message: 'Analytics not found' });
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: (error as Error).message });
  }
};