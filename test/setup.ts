import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

beforeAll(async () => {
  process.env.TTL = '1';
  const test_uri = process.env.MONGO_URI_TEST!;

  console.log('test_uri: ', test_uri);

  await mongoose.connect(test_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  // await mongo.stop();
  await mongoose.connection.close();
});
