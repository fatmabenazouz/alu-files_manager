import sequelize from './models/index.js'; 

sequelize.authenticate()
    .then(() => {
        console.log('Database connection successful!');
        process.exit(0); 
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
        process.exit(1); 
    });