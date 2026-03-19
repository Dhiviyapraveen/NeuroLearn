import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};