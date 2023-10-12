import fetch from './fetch';
import setTimer from 'services/setTimer';

const punchClockIn = async () =>
  fetch
    .post('/api/user/record')
    .then((res) => {
      localStorage.setItem('taskID', res.data?.data?.taskID);
      setTimer();
      return res.status;
    })
    .catch((err) => console.log(err));

export default punchClockIn;
