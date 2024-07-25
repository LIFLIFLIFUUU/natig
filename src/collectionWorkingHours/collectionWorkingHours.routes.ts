import { Router } from 'express';
import { getAllCharacters, getCharacterById, addCharacter, updateCharacter } from './character.controller';

const collectionWorkingHoursRouter = Router();

collectionWorkingHoursRouter
.post('/add', addHours)
.put('/change/:id', changeHours)
.get('/client/:id', getClientHours)
.get('/worker/:id', getWorkerHours)

export default collectionWorkingHoursRouter