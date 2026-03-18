import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Token expired" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken;
  
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) throw new Error("Not authenticated");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw new Error("User not found");

    req.user = user; // מגדירים את המשתמש ב־req כדי שהcontroller יוכל להשתמש בid
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authenticated" });
  }
};