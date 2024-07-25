import { Router } from 'express';
import { addClient, getAllClients, getClientById, login } from './officeWorker.controller';
// TODO: addClient, updateClient

const officeWorkersRouter = Router();

officeWorkersRouter
    .get('/', getAllClients) // V
    .get('/:id', getClientById) // V
    .post('/addClient', addClient) // תומר
    // .put('/:id', updateClient) // תומר
    .post('/login', login) // V
    // .post('/add', addWorker) // תומר
    // .get('/viewClientDocuments', viewClientDocuments) // ביחד
    // .post('/validateClientDocuments', validateClientDocuments) // ביחד
    // .put('/updateWorkerTime', updateWorkerTime) // ביחד
    export default officeWorkersRouter
