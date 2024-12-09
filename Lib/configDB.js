import {connect} from "mongoose"
const connectDB = async () => {
     await connect(process.env.Mongo_URI);
     console.log(`Mongo connected`);
      
}

export default connectDB;