const dotenv=require('dotenv')
process.on('uncaughtException', function(err) { 
    if (process.env.NODE_ENV === 'PRODUCTION') {console.log(err.message)}
    if (process.env.NODE_ENV === 'DEVELOPMENT'){console.log(err.stack)}
   
    console.log('Server is shutting down due to uncaught Exception');
        process.exit(1);
 });
dotenv.config({path:'BackEnd/.gitignore/config/config.env'});
const app= require('./app')

const port= process.env.PORT ||6000
const DatabaseConnection=require('./config/database')
DatabaseConnection();
const server=app.listen(port, ()=>{
console.log(`Server is started on ${port} on ${process.env.NODE_ENV} mode`);
    
})
process.on('unhandledRejection', (err)=>{
        console.log(`Error: ${err.message}`);
        console.log('Server is shutting down due to unhandled Promise Rejection');
        server.close(()=>{
            process.exit(1);
        });
})