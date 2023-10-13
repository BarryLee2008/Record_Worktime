import fetch from './fetch';
import getDateString from 'pages/utils/getDateString';
import getTimeString from 'pages/utils/getTimeString';

const getSingleUserRecord = async (userID: string) =>
  fetch
    .post('/api/admin/singleuser', { userID })
    .then((res) => {
      //const tasks = res.data.data.tasks;
      //const name = res.data.fullname;
      const records: any[] | PromiseLike<any[]> = [];
      const tasks: any[] = res.data.data.tasks;
      tasks.forEach(
        (e: {
          id: any,
          start_time: string,
          end_time: string,
          location: any,
          total_worktime: any,
        }) => {
          records.push({
            key: e.id,
            date: getDateString(e.start_time),
            time:
              getTimeString(e.start_time) +
              ' ~ ' +
              getTimeString(e.end_time === e.start_time ? '' : e.end_time),
            location: e.location,
            workingHour: Number(e.total_worktime).toFixed(1),
          });
        }
      );
      return records;
    })
    .catch((err) => console.log(err));

export default getSingleUserRecord;
