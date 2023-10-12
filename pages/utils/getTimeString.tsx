const getTimeString = (dateTimeStr: string) => {
  if (dateTimeStr === '') return '';
  const datetime = dateTimeStr.split(' ');
  const timeArr = datetime[1]?.split(':');
  return timeArr[0] + ':' + timeArr[1];
};

export default getTimeString;
