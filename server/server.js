const express = require('express');
const cors = require("cors");
const axios = require('axios')

const app = express();

const url = 'https://api-pub.bitfinex.com/v2/'

// a real app would have creds in dotenv, but I am not going to install dotenv since there are no secrets here

async function request(pathParams) {
  try {
    return await axios.get(`${url}/${pathParams}`)
  } catch (err) {
    console.log(err)
  }
}

app.use(
  cors({
    origin: '*',
    credentials: false
  })
);

app.get('*', async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  const {data} = await request(req.path);
  res.status(200);
  return res.send(data);
});


app.listen(4000, () => console.log(`server Listening on port ${4000}`));
