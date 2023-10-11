import { useRouter } from 'next/router';
import fetch from './fetch';

type AuthProps = {
  token: string,
};

const getAuth = async () => {
  const token = localStorage.getItem('token') || '';
  const body: AuthProps = {
    token,
  };
  return fetch
    .post('/api/user/verifyjwt', body)
    .then((res) => res.status)
    .catch((err) => {
      console.log(err);
      useRouter().push('/');
    });
};
export default getAuth;
