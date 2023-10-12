import fetch from './fetch';

type updateCredential = {
  newPassword?: string,
};

const updatePassword = async (credentials: updateCredential) =>
  fetch
    .post('/api/user/userinfochange', credentials)
    .catch((err: any) => console.log(err));

export default updatePassword;
