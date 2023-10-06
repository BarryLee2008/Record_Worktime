const getTwoDigits = (digit: number) => {
  return digit >= 10 ? digit + "" : "0" + digit;
};
export default getTwoDigits;
