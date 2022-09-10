import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModel from '../models/user.js'

const secret = 'secret';

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await UserModel.findOne({email});

    if (!oldUser) {
      return res.status(400).json({ message: 'User does not exists' });
    }

    const isPassowordCorrect = await bcrypt.compare(password, oldUser.password);
    
    if(!isPassowordCorrect) return res.status(400).json({message: 'Invalid Credentials'});

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: '1h' });
    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong'});
    console.log(error);
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const oldUser = await UserModel.findOne({email});

    if (oldUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashPassoword = await bcrypt.hash(password, 12);
    const result = await UserModel.create({
      email, password: hashPassoword, name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: '1h' });
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong'});
    console.log(error);
  }
};