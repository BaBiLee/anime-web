import express from 'express';
import configureViewEngine from './configs/viewEngine';
import initWebRoutes from './route/web.js';
import connection from './configs/connectDB.js';
import initAPIRoute from './route/api.js';

require('dotenv').config();
// const cors = require('cors');
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials:true,
//   optionsSuccessStatus: 200
// }
const app = express();
// const port = process.env.PORT || 3005;
const port = 3005;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });
configureViewEngine(app);
//initWebRoutes(app);

initAPIRoute(app);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
