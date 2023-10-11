import fetch from './fetch';

const getUserWorkTime = async () =>
  fetch
    .get('/api/user/getuserworktime')
    .then((res) => res.data.data)
    .catch((err) => console.log(err));

export default getUserWorkTime;
