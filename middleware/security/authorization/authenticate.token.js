import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];;

  if (!token) {
    return res.status(401).json({ message: 'Access token not provided' });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err, "err");
      return res.status(401).json({ message: 'Invalid access token' });
    }

    req.user = user;
    next();
  });
};

export default authenticateToken