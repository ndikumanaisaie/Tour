import jwt  from 'jsonwebtoken';

const secret = 'secret';
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const isCustumAuth = token.length < 500;

    let decodedData;

    if (token && isCustumAuth) {
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub.toString();
    }

    next();

  } catch (error) {
    console.log(error);
  }
};

export default auth;

