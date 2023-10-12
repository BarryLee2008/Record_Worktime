const getDateString = (dateTimeStr: string) => {
  const datetime = dateTimeStr.split(' ');
  return datetime[0] || '';
};

export default getDateString;
