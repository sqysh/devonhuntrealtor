import jwt from "jsonwebtoken";
import generateRandomString from "./genereateRandomString";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user: any, expiresIn: string | number): string =>
  jwt.sign(user ?? { username: generateRandomString(30) }, JWT_SECRET, {
    expiresIn,
  } as jwt.SignOptions);

export default generateToken;
