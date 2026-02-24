const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

dotenv.config({ path: 'Backend/config/config.env' });

// Connect DB
connectDatabase();

const PORT = process.env.PORT || 8000;

const serve = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

process.on("unhandledRejection", (err) =>{
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  serve.close(() => {process.exit(1);
  });
})

process.on("uncaughtException", (err) =>{
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception error");  
   serve.close(() => {process.exit(1);
  });
});
