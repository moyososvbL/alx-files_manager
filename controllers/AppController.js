import dbClient from '../utils/db';
import redisClient from '../utils/redis';

export const getStatus = function sts(req, res) {
  const redis = redisClient.isAlive();
  const db = dbClient.isAlive();
  res.send({ redis, db });
};

export const getStats = async function stt(req, res) {
  const users = await dbClient.nbUsers();
  const files = await dbClient.nbFiles();
  res.send({ users, files });
};
