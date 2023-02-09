const app = require('./app');
const config = require('./configs/config');

const port = config.port || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
