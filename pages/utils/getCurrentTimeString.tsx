import getTwoDigits from "./getTwoDigits";

const getCurrentTimeString = () => {
  const datetime = new Date();
  const hours = getTwoDigits(datetime.getHours());
  const minutes = getTwoDigits(datetime.getMinutes());
  const seconds = getTwoDigits(datetime.getSeconds());

  return hours + ":" + minutes + ":" + seconds;
};

export default getCurrentTimeString;
