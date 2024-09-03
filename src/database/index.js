import mongoose from "mongoose";

const connectToDB = async () => {
    const connectionUrl = "mongodb+srv://hasanusa43:7B60SprOM3IMbyCc@clusterrabiul.yf2sa.mongodb.net/"
    mongoose.connect(connectionUrl).then(() => console.log("blog databse connection is successfull")).catch((error) => console.log(error));

}

export default connectToDB;