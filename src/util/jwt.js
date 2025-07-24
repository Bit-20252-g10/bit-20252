import jwt from 'jsonwebtoken';


export const generateToken = (userData) => {
  try {
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign(userData, secretKey, { expiresIn: '24h' });
    return token;
  } catch (error) {
    throw new Error("Token generado no está firmado correctamente", error);
  }
}