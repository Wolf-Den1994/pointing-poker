import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', () => {
  console.log('kkk');
});

async function start() {
  try {
    await mongoose.connect(
      process.env.MONGODB__URI
      || 'mongodb+srv://RSSchool-React:planning-poker@poker.jgasx.mongodb.net/Planning-poker-db?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    httpServer.listen(PORT, () => console.log(`Server started on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

app.use('/', (req, res) => {
  res.send('Test');
});

start();
