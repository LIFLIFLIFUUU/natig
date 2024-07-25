import { MongoClient, ObjectId } from "mongodb";
import { getClients } from "./client.db";



export async function findByEmailAndPassword(email: string, password: string) {
    let query = { email, password };
    let projection = { password: 0 };
    let client = await getClients(query, projection);
    return client[0];
  }