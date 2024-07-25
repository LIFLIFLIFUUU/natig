import 'dotenv/config'; // apply env vars
import express from 'express';
import clientsRouter from './clients/client.routes';
import officeWorkersRouter from './officeWorker/officeWorker.routes';

//config
//process.env.PORT --> the live server port
const PORT = process.env.PORT || 5555; 

//create the server
const server = express();

//config JSON support
server.use(express.json());

//using routes
server.use('/api/clients', clientsRouter);
server.use('/api/officeWorkers', officeWorkersRouter);

//run the server
server.listen(PORT, () => console.log(`[Server] http://localhost:${PORT}`));