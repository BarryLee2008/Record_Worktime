import AppDataSource from 'db/data-source';
import { Task } from 'db/entities/index';
import format from 'date-fns/format';

const setTimer = async (taskID: number | undefined) => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  const taskRepo = AppDataSource.getRepository(Task);
  const response = await taskRepo.findOne({
    relations: {
      user: true,
    },
    where: {
      id: taskID,
    },
  });
  //console.log(response?.total_worktime)
  if(response?.total_worktime != 0) {
    console.log('AAAAAAAA')
    console.log(response?.id)
    return console.log('The task has ended')
  }
  if (response?.start_time) {
    let start_time = new Date(response?.start_time).getTime() + 16 * 1000 * 60 * 60;
    let end_time = format(new Date(start_time), 'yyyy-MM-dd HH:mm:ss');
    response!.end_time = format(new Date(end_time),'yyyy-MM-dd HH:mm:ss')
    response.total_worktime = 16
    response.user!.status = 0
    await taskRepo.manager.save(response)
    //console.log('I am here')
  }

 
};
export default setTimer;
