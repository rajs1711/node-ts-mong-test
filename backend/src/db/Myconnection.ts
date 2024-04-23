import mongoose, { Connection } from "mongoose";


const connect= async()=>{

   try{
     //console.log(process.env.CONN_URL)
      const connection_url : string|undefined= process.env.CONN_URL
      const con  = await mongoose.connect(`${connection_url}`); 
      console.log(`sucessfull connection ${con.connection.host}`)
    }catch(e){
      console.log(e)
       process.exit(1)
     }
}

export default connect
