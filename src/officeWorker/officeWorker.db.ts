import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import { officeWorker } from "./officeWorker.type";
import { client } from "../clients/client.type";

const DB_INFO = {
    host: process.env.CONNECTION_STRING as string,
    db: process.env.DB_NAME as string,
    office_worker_collection: 'office_workers',
    clients_collection: 'clients',
    working_hours_collection: 'working_hours'
}

export async function findAll(query = {}, projection = {}): Promise<any> {
    let mongo = new MongoClient(DB_INFO.host); // Use the correct connection string
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.office_worker_collection).find(query, { projection }).toArray();
    } catch (error) {
        throw error;
    } finally {
        await mongo.close(); // Make sure to await the close operation
    }
}


// פונקציה לקבלת לקוחות
export async function getClients(query = {}, projection = {}) {
    let mongo = new MongoClient(DB_INFO.host);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.clients_collection).find(query, { projection }).toArray();
    } catch (error) {
        throw error;
    } finally {
        mongo.close();
    }
}
export async function addClientToDatabase(newClient: client) {
    let mongo = new MongoClient(DB_INFO.host);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.clients_collection).insertOne(newClient);
    } catch (error) {
        throw error;
    } finally {
        await mongo.close();
    }
}

// export async function getAllOfficeWorkers(query = {}, projection = {}) {
//     let mongo = new MongoClient(DB_INFO.host);
//     try {
//         await mongo.connect();
//         return await mongo.db(DB_INFO.db).findAll();
//     } catch (error) {
//         throw error;
//     } finally {
//         mongo.close();
//     }
// }

// פונקציה להוספת לקוח
export async function addClient(client: Omit<client, '_id'>) {
    let mongo = new MongoClient(DB_INFO.host);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.clients_collection).insertOne(client);
    } catch (error) {
        throw error;
    } finally {
        mongo.close();
    }
}

// פונקציה לעדכון מסמך
export async function updateDoc(id: string, officeWorker: officeWorker) {
    let mongo = new MongoClient(DB_INFO.host);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.office_worker_collection).updateOne(
            { _id: new ObjectId(id) }, // המרת ה-ID ל-ObjectId
            { $set: officeWorker }
        );
    } catch (error) {
        throw error;
    } finally {
        mongo.close();
    }
}

// פונקציה לקבלת ספירת מסמכים
export async function getDocCount(query = {}) {
    let mongo = new MongoClient(DB_INFO.host);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.office_worker_collection).countDocuments(query);
    } catch (error) {
        throw error;
    } finally {
        mongo.close();
    }
}
