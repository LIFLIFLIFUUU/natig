import { Request, Response } from 'express';
import { findByPersonalIdAndPassword, getAll, getByEmail, getById, getWorkerById, insertClient} from './officeWorker.model';
import { findAll } from './officeWorker.db';
import { officeWorker } from './officeWorker.type';
import { ObjectId, WithId } from 'mongodb';
// TODO: insertCharacter, update 

export async function getAllClients(req: Request, res: Response) {
    try {
        let clients = await getAll();
        res.status(200).json({ clients });
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function getClientById(req: Request, res: Response) {
    try {
        let { id } = req.params;

        if (id.length != 24)
            return res.status(403).json({ message: 'invalid id' });

        let client_id = await getById(id);

        if (!client_id)
            res.status(404).json({ message: 'client not found' });
        else
            res.status(200).json({ client_id });
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function getOfficeWorkerById(req: Request, res: Response) {
    try {
        let { id } = req.params;

        if (id.length != 24)
            return res.status(403).json({ message: 'invalid id' });

        let worker_id = await getWorkerById(id);

        if (!worker_id)
            res.status(404).json({ message: 'client not found' });
        else
            res.status(200).json({ worker_id });
    } catch (error) {
        res.status(500).json({ error });
    }
}


export async function addClient(req: Request, res: Response) {
    try {
        let { client_name, client_type, address, mobile_number, income_tax_file, vat_file_number, email, password, home_number, documents } = req.body;
        
        if (!email)
            return res.status(400).json({ message: 'email is required' });

        // בדיקה אם הלקוח קיים לפי אימייל
        let existingClient = await getByEmail(email);
        if (existingClient) {
            return res.status(400).json({ message: 'Client with this email already exists' });
        }

        // הוספת לקוח חדש
        let result = await insertClient(client_name, client_type, address, mobile_number, income_tax_file, vat_file_number, email, password, home_number, documents);
        
        if (!result.acknowledged)
            res.status(500).json({ message: 'internal server error. please try again' });
        else
            res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error });
    }
}

// export async function updateClient(req: Request, res: Response) {
//     try {
//         let { id } = req.params;
//         let { name, lightsaberColor } = req.body;

//         if (id.length != 24)
//             return res.status(403).json({ message: 'invalid id' });

//         if (!name)
//             return res.status(400).json({ message: 'name is required' });

//         let result = await update(id, name, lightsaberColor);
        
//         if (result.modifiedCount == 0)
//             res.status(404).json({ message: 'client not found' });
//         else
//             res.status(200).json({ result });
//     } catch (error) {
//         res.status(500).json({ error });
//     }
// }

export async function login(req: Request, res: Response) {
    try {

        const { personal_id, password } = req.body;

        // Validate required fields
        if (!personal_id || !password) {
            res.status(400).json({ message: 'ID and password must be provided' });
            return;
        }


        //route -> controller -> model -> db
        // מותר לגשת רק לפונקציות שבאות אחרי החץ של כל אחד!!!!!!!!
        // לדוגמה ראוט יכול לגשת רק לפונקציות של קונטרולר

        // Fetch all office workers
        const officeWorker: officeWorker = await findByPersonalIdAndPassword(personal_id, password); //await findAll(); 
        // const office_worker = allOfficeWorkers.find(
        //     (worker: officeWorker) => worker._id.toString() === _id
        // );

        // console.log('Found office worker:', office_worker); // Log the found office worker

        // Check if office worker exists and password matches
        if (officeWorker) {
            res.status(200).json({ msg: 'Office worker found!',officeWorker });
        } else {
            res.status(400).json({ msg: 'Invalid ID or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export async function addWorker(req: Request, res: Response) {
        //TODO: get the values from req.body
        // TODO: write the insertWorker function in model that getd those values
}