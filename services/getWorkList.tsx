import fetch from './fetch';

const getWorkList = async () =>
  fetch
    .get('/api/admin/totalworktime')
    .then((res) => {
      //const tasks = res.data.data.tasks;
      //const name = res.data.fullname;
      const records: any[] | PromiseLike<any[]> = [];
      const userData: any[] = res.data.data;
      userData.forEach((data) => {
        const name = data.fullname;
        records.push({
          id: data.id,
          name: name,
        });
      });
      return records;
    })
    .catch((err) => console.log(err));

export default getWorkList;
