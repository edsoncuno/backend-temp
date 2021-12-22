import { connect } from 'mongoose';
import { config } from 'dotenv';

export default class ConnectToDatabase {
    async connectToMongoDB() {
        try {
            config();
            const database = await connect(process.env.CONNECTION_STRING);
            console.log('Connected to the database: ', database.connection.name);
        } catch (error) {
            error => console.error(error);
        }
    }
}