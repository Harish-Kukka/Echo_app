import jwt from 'jsonwebtoken';
import 'dotenv/config.js';
import axios from 'axios';

const auth = async (req, res, next) => {
  try {
    const token_data = req.headers.authorization.split(' ');
    const googleToken = token_data.length === 3 ? token_data[2] : null;
    let decodedData;
    if (token_data[1] === 'google' && googleToken) {
      decodedData = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${googleToken}`,
          },
        }
      );
      req.userId = decodedData?.sub;
    } else {
      console.log(token);
      decodedData = jwt.verify(token_data[1], process.env.JWT_SECRET);
      req.userId = decodedData?.id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
