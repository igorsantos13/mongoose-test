require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

// Streamer - Schema
const Streamer = mongoose.model('Streamer', {
  nickname: String,
  platform: String,
  subscribers: Number,
  age: Number,
  partnerSince: Date
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/streamers', async(req,res) => {
  const streamers = await Streamer.find()
  res.send(streamers)
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

app.put('/:id', async(req,res) => {
  const id = req.params.id
  const streamer = await Streamer.findByIdAndUpdate({_id: id}, {
    subscribers: req.body.subscribers
  }, {new: true})

  return res.send(streamer)
})

app.delete('/:id', async(req,res)=> {
  const id = req.params.id
  const streamer = await Streamer.findByIdAndDelete({_id: id})
  return res.send(streamer)
})

app.listen(port, () => {
  //mongoose connect
try{
  mongoose.connect(process.env.CONNECTION_STRING)
}catch(e){
  console.log(e)
}

  console.log(`Rodando na porta: ${port}`)
})


