import express from 'express';

import { DB, IN_PORD, PORT } from './config';

const app = express();
// const port = process.env.PORT ||  3000

app.get('/', (req, res) =>{
	res.send("Rajapandi");
});

app.listen(PORT, () => console.log(`Server on ${PORT}`));