import jwt  from 'jsonwebtoken';
import UserModel from '../models/user.js'

const secret = 'test';
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const isCustumAuth = token.length < 500;

    console.log(token);

    let decodedData;

    if (token && isCustumAuth) {
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      const googleId = decodedData?.sub.toString();
      const user = UserModel.findOne({ googleId });
      req.userId = user?._id;
    }

    next();

  } catch (error) {
    console.log(error);
  }
};

export default auth;

