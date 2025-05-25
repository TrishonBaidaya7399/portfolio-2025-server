import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserDetails from '../models/UserDetails';
import { UserDetails as UserDetailsInterface } from '../interfaces/UserDetails';

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const user = await UserDetails.findOne().select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: (error as Error).message });
  }
};

export const updateUserDetails = async (req: Request, res: Response) => {
  try {
    const userData: Partial<UserDetailsInterface> = req.body;
    const user = await UserDetails.findOneAndUpdate({}, userData, { new: true }).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, message: 'User details updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserDetails.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: (error as Error).message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, ...userData } = req.body;
    const existingUser = await UserDetails.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserDetails({ ...userData, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: (error as Error).message });
  }
};