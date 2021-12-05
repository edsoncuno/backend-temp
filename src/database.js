import { connect } from 'mongoose';
import { config } from 'dotenv';
config();
(async () => {
    try {
        const database = await connect(process.env.CONNECTION_STRING);
        console.log('Database is connected ', database.connection.name);
    } catch (error) {
        error => console.error(error);
    }
})();