const express = require('express')
const server = express()
const mongoose = require("mongoose")
const usuarioRoutes = require("./routes/UsuariosRoutes")


server.use(express.urlencoded({extended:true}))
server.use(express.json())

server.use('/usuario', usuarioRoutes)

mongoose.connect('mongodb://mongo:27017/sistema_estoque', {useNewUrlParser: true,useUnifiedTopology: true})
.then(result => {
  console.log('MongoDB Conectado')
  server.listen(3333)
})
.catch(error => {
  console.log('Erro de connexão com MongoDB:',error)
});