import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import routers from './src/routers';
import config from './config/config';

const app = express();
const PORT = process.env.PORT ||  3000

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routers)
// mongoose.set('useCreateIndex', true);
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// const NODE_ENV = process.env.NODE_ENV || 'local';
mongoose.connect(config.MONGO_DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
const db = mongoose.connection;

db.on('error', (err) => {
  console.log(err);
});
db.once('open', () => {
  console.log('Connection with database succeeded.');
});

// mongoose.connect(process.env.DB, {
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true
// 		});

app.get('/', (req, res) =>{
	res.send("Rajapandi");
});

app.listen(PORT, () => console.log(`Server on ${PORT}`));