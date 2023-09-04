import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    MongoClient.connect(url, { useUnifiedTopology: true }, (error, user) => {
      if (error) console.log(error);
      this.db = user.db(database);
      this.users = this.db.collection('users');
      this.files = this.db.collection('files');
    });
  }

  isAlive() {
    return !!this.db;
  }

  async nbUsers() {
    const documentsCount = await this.users.countDocuments();
    return documentsCount;
  }

  async nbFiles() {
    const filesCount = await this.files.countDocuments();
    return filesCount;
  }

  async findUser(user) { return this.db.collection('users').findOne(user); }

  async createUser(email, password) {
    await this.db.collection('users').insertOne({ email, password });

    const newUser = await this.db.collection('users').findOne({ email });

    return { id: newUser._id, email };
  }

  async uploadFile(data) {
    await this.db.collection('files').insertOne(data);
    return this.db.collection('files').findOne(data);
  }
}

const dbClient = new DBClient();
export default dbClient;
