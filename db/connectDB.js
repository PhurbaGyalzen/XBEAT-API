import mongoose from 'mongoose';

const connectDB = async (DATABASE_URL)=>{
    try {
        const DB_OPTIONS = {
            'dbName': 'XBEAT'
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS);
        console.log('Database connection established successfully...');

    } catch (error) {
        console.log(error);
    }
}

export default connectDB
