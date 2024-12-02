import jwt from "jsonwebtoken";
import "dotenv/config";

export default (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decodedToken;
    req.auth = {
      userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
