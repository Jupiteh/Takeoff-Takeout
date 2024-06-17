import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { generateToken } from '../utils/tokenUtils'; 

export const register = async (req: Request, res: Response) => {
    const { username, password, email, role } = req.body; // Ensure to include email
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, email, role }); // Ensure to include email
        await newUser.save();
        res.status(201).json({ message: 'User created' });
    } catch (err: any) {
        if (err.code === 11000) {
            res.status(400).json({ message: 'Username or email already exists' });
        } else {
            res.status(500).json({ message: 'Error creating user', error: err.message });
        }
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user._id, user.role);
        res.json({ token });
    } catch (err: any) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select('-password'); // Exclude password field
        res.json(users);
    } catch (err: any) {
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
};
