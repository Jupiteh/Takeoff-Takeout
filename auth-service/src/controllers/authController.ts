import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import { generateToken } from '../utils/tokenUtils';

export const register = async (req: Request, res: Response) => {
    const { username, password, email, role } = req.body;

    if (!username || !password || !email || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, email, role });
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
    console.log("Entering getUsers function"); // Debug log
    try {
        const users = await User.find({});
        console.log("Users fetched successfully:", users); // Debug log
        res.status(200).json(users);
    } catch (err: any) {
        console.error("Error fetching users:", err); // Debug log
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
};
