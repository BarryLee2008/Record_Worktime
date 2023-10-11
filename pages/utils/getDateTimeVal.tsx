type DateTimeVal = {
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
};

const getDateTimeVal = (dateTimeStr: string) => {
  const datetime = dateTimeStr.split(' ');
  const dateArray = datetime[0]?.split('-');
  const timeArray = datetime[1]?.split(':');

  const dateTimeVal: DateTimeVal = {
    year: parseInt(dateArray[0]),
    month: parseInt(dateArray[1]),
    day: parseInt(dateArray[2]),
    hour: parseInt(timeArray[0]),
    minute: parseInt(timeArray[1]),
    second: parseInt(timeArray[2]),
  };

  return dateTimeVal;
};

export default getDateTimeVal;
