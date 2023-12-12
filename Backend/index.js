const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')


const connectToMongo = require("./connection")
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(cors());



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api" , require("./routes/Todo"))




app.listen(port, () => {
    connectToMongo();
  console.log(`Example app listening on port ${port}`)
})