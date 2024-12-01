const fileQueue = require('./queue');

fileQueue.process(async (job) => {
  console.log(`Processing file with ID: ${job.data.fileId}`);
});