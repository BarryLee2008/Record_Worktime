import fetch from './fetch';

const setTimer = async () => {
  const taskID = localStorage.getItem('taskID');
  return fetch
    .post('/api/user/settimer', { taskID })
    .catch((err) => console.log(err));
};

export default setTimer;
