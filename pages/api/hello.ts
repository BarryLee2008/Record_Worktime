// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import AppDataSource from '../../db/data-source';

type Data = {
  name: string,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await AppDataSource.initialize();
  let isConnected = AppDataSource.isInitialized;
  console.log(isConnected);
  res.status(200).json({ name: 'John Doe' });
}
