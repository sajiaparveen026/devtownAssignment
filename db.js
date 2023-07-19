const mongoose = require('mongoose');

module.exports = () =>{
    const connectionParams ={
         useNewUrlParser:true,
         useUnifiedTopology:true,
      };
      try{
        mongoose.connect(process.env.MONGODB_URL,connectionParams);
        console.log("Connected To Database");
      }catch(error){
        console.log(error);
        console.log("Could not Connected to databse!");
      }
}