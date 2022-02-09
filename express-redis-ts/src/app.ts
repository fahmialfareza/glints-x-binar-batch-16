import express from 'express';

// Import redis client
import connectToRedis from './db/redis';
// Import mongo client
import connectToMongo from './db/mongodb';

import bookRoutes from './routes/book';

connectToMongo();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/books', bookRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
