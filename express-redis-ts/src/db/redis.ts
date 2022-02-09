import { createClient } from 'redis';

// function connect to redis
async function client() {
  try {
    const client = createClient({
      url: 'redis://default:HdYq7tm7kpAahGknqWkGAzpqxouIAri1@redis-13557.c295.ap-southeast-1-1.ec2.cloud.redislabs.com:13557',
    });

    await client.connect();

    console.log('Connected to Redis');

    return client;
  } catch (error) {
    throw error;
  }
}

export default client;
