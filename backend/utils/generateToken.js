import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const key = 'abc123';
  console.log(key);
  const token = jwt.sign({ userId }, key, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return token;
};

export default generateToken;
