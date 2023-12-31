import fetch from './fetch';

type LoginCredential = {
  email?: string,
  password?: string,
};

const login = async (credentials: LoginCredential) =>
  fetch
    .post('/api/user/login', credentials)
    .catch((err: any) => console.log(err));

export default login;
