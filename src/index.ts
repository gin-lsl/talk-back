import { createServer } from 'http';
import { app } from './app';

const SERVER_PORT = 3003;

createServer(app).listen(SERVER_PORT, () => {
  console.log('Server running @ localhost:3003');
});
