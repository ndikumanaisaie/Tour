import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secret = 'secret';

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  
}