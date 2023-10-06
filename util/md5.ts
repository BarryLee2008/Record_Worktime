import cropy from 'crypto';

export const encryption = (psw: string) => {
  return cropy
    .createHash('md5')
    .update('rider_henshin' + psw)
    .digest('hex');
};
