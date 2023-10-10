import fetch from './fetch';

type ClockOutReq = {
  taskID: number,
};

const punchClockOut = async (body: ClockOutReq) =>
  fetch
    .put('/api/user/record', body)
    .then((res) => {
      console.log(res);
      return res.status;
    })
    .catch((err) => console.log(err));

export default punchClockOut;
