import fetch from '../../service/fetch';

type LoginCredential = {
  email?: string,
  password?: string,
};

const login = (credentials: LoginCredential) =>
  fetch
    .post('/api/user/login', credentials)
    .then((response) => {
      if (response.status === 200)
        localStorage.setItem('token', response.data?.token);
      return response.status;
    })
    .catch((err: any) => console.log(err));

export default login;
