const getTimeString = (dateTimeStr: string) => {
  const datetime = dateTimeStr.split(' ');
  return datetime[1] || '';
};

export default getTimeString;
