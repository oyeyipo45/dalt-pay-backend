import mongoose from 'mongoose';
import app from './app';
import config from './config';

// Make sure we are running node 10+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 10 || (major === 10 && minor <= 8)) {
  console.log("You're on an older version of node, please update to have a smoother development experienece");
  process.exit();
}

// Connect to our Database and handle any bad connections
mongoose.connect(config.database);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

const server = app.listen(config.port, () => {
  console.log(`Express running → PORT ${config.port}`);
});

export default server;