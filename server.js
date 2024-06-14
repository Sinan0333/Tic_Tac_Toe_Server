const server = require('./utils/socketIo')
const {mongoDB} = require('./config/monogdb')

mongoDB()

server.listen(process.env.PORT, () => {
    console.log('Server started');
}).on('error', (error) => {
    console.error('Error starting the server:', error);
    process.exit(1); 
});