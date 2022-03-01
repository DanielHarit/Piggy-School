import {MongoClient} from 'mongodb';
import * as dotenv from 'dotenv';
import config from '../config.js'
dotenv.config()

const client = new MongoClient(process.env.connectionString);

export const initializeDbConnection = async () =>{
    console.log("Connecting to DB...");
    await client.connect();
    console.log("Successfully connected to the database");
}

export default client.db(config.dbName)