import { sign, verify } from 'jsonwebtoken';

export const createJWT = async (data: any) => {
  if (!process.env.SECRETKEY) {
    throw 'The Secretkey Missed';
  }
  const token = sign({ data }, process.env.SECRETKEY, {
    expiresIn: '12h',
  });
  return token;
};

export const verifyJWT = async (token: string) => {
  if (!process.env.SECRETKEY) {
    throw 'The Scretkey Missed';
  }
  const decode = verify(token, process.env.SECRETKEY);
  return decode;
};
