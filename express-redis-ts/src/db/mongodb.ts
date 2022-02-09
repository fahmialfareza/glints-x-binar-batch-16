import { connect } from 'mongoose';

async function connectToMongo() {
  try {
    const client = await connect(
      'mongodb+srv://fahmialfareza:YHKSIBDb5pwweKnd@cluster0.m85qd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    );

    console.log('Connected to MongoDB');

    return client;
  } catch (error) {
    throw error;
  }
}

export default connectToMongo;
