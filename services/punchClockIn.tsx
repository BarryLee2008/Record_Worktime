import fetch from './fetch';
import setTimer from 'services/setTimer';

type ClockInReq = {
  location: string,
};

const punchClockIn = async (body: ClockInReq) =>
  fetch
    .post('/api/user/record', body)
    .then((res) => {
      localStorage.setItem('taskID', res.data?.data?.taskID);
      setTimer();
      return res.status;
    })
    .catch((err) => console.log(err));

export default punchClockIn;
