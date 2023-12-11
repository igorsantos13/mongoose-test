require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

//mongoose connect
try{
  mongoose.connect(process.env.CONNECTION_STRING)
}catch(e){
  console.log(e)
}

// Streamer - Schema
const streamerSchema = new mongoose.Schema({
  nickname: String,
  platform: String,
  subscribers: Number,
  age: Number,
  partnerSince: Date
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//add streamer
app.post('/', async(req, res) => {
  const streamer = new Streamer ({
    nickname: req.body.nickname,
    platform: req.body.platform,
    subscribers: req.body.subscribers,
    age: req.body.age,
    partnerSince: req.body.partnerSince,
  })

  await streamer.save()
  res.send(streamer)
})

app.listen(port, () => {
  console.log(`Rodando na porta: ${port}`)
})


