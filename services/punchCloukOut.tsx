import fetch from './fetch';

type ClockOutReq = {
  taskID: number,
  location: string,
};

const punchClockOut = async (body: ClockOutReq) =>
  fetch
    .put('/api/user/record', body)
    .then((res) => res.status)
    .catch((err) => console.log(err));

export default punchClockOut;
